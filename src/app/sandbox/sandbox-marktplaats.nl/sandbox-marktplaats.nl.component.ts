import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

interface MarktplaatsMessage {
  author: string;
  localTime: string;
  dataSemQualifier: string;
  text: string;
  testStatus?: string;
}

interface MarktplaatsProductInfo {
  name: string;
  price: string;
  location: string;
  link: string;
}

interface MarktplaatsConversationPageData {
  product: MarktplaatsProductInfo;
  opponentName: string;
  myName: string;
  myUserId: string;
  opponentLink: string;
  thumbnailStyle: string;
}

type Intention = "selling" | "buying";

@Component({
  selector: 'app-sandbox-marktplaats.nl',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './sandbox-marktplaats.nl.component.html',
  styleUrl: './sandbox-marktplaats.nl.component.css'
})
export class SandboxMarktplaatsNlComponent {

  intention?: Intention;
  data?: MarktplaatsConversationPageData;
  messages?: MarktplaatsMessage[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(next => {
      this.intention = next['intention'] || 'selling';
      this.data = this.loadDataFor(this.intention!);
      this.messages = this.generateMessagesFor(this.intention!, this.data!);

      // Resetting the composed reply
      const sendContent = document.getElementById('sandbox-mock-send-content');
      sendContent && (sendContent.innerHTML = "");

      // Support bext detection of marktplaats user
      var script = document.createElement('script');
      script.textContent = `var XXXX={"fu": "bar","loggedInUser":{"id":${this.data!.myUserId},"name":"${this.data!.myName}"},"experimentData":{}};`
      document.body.appendChild(script);
    });
  }

  ngAfterViewInit() {
    // disable clicks on <a> in .ConversationTopic-module-root childs
    setTimeout(() => {
      const links = document.querySelectorAll('.ConversationTopic-module-root a');
      links.forEach(function (link) {
        link.addEventListener('click', function (event) {
          alert("Clicking on <a> in sandbox is not allowed.\nClick on 'Suggest a Reply' button instead.");
          // Prevent the default action (navigation)
          event.preventDefault();
        });
      });

      const messagesRef = this.messages;
      const sendContent = document.getElementById('sandbox-mock-send-content');
      const sendButton = document.getElementById('sandbox-mock-send-button');
      sendButton?.addEventListener('click', function (event) {
        console.log(">", sendButton.innerText)
        if (sendContent?.innerText !== "") {
          const now = new Date();
          const t = makeTimes(now);
          messagesRef?.push({
            author: "me",
            dataSemQualifier: `me-${t[0]}`,
            localTime: t[1],
            text: sendContent?.innerText || "",
          });
          sendContent && (sendContent.innerHTML = "");
        }
      });
    },
      100);
  }

  loadDataFor(intention: Intention): MarktplaatsConversationPageData | undefined {
    if (intention === "selling") {
      return {
        product: {
          name: "Cactus in ancient vase",
          price: "120,00",
          location: "Amsterdam",
          link: "/assets/sandbox/mocks/marktplaats/i-am-selling.html?orig=https://link.marktplaats.nl/m0123456789",
        },
        opponentName: "Jay",
        myName: "Bob",
        myUserId: "87654321",
        opponentLink: "/assets/sandbox/mocks/marktplaats/u/12345678.html?origin=https://www.marktplaats.nl/verkopers/12345678.html",
        thumbnailStyle: `background-image: url(/assets/sandbox/mocks/marktplaats-sell-thumbnail-mock.png#https://images.marktplaats.com/api/v1/listing-mp-p/images/a1/45364B02-E9B0-4697-87B2-00497C5B6FD8?rule=ecg_mp_eps$_82.jpg); `,
      }
    } else if (intention === "buying") {
      return {
        product: {
          name: "Red crowbar",
          price: "12,00",
          location: "Rotterdam",
          link: "/assets/sandbox/mocks/marktplaats/i-am-buying.html?orig=https://link.marktplaats.nl/m0123456789",
        },
        opponentName: "Gordon",
        myName: "Barney",
        myUserId: "87654321",
        opponentLink: "/assets/sandbox/mocks/marktplaats/u/43211234.html?origin=https://www.marktplaats.nl/verkopers/12345678.html",
        thumbnailStyle: `background-image: url(/assets/sandbox/mocks/marktplaats-buy-thumbnail-mock.png#https://images.marktplaats.com/api/v1/listing-mp-p/images/a1/45364B02-E9B0-4697-87B2-00497C5B6FD8?rule=ecg_mp_eps$_82.jpg); `,
      }
    }
    return undefined;
  }

  generateMessagesFor(intention: Intention, data: MarktplaatsConversationPageData): MarktplaatsMessage[] {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 0);
    const t3 = makeTimes(now);
    now.setMinutes(now.getMinutes() - 1);
    const t2 = makeTimes(now);
    now.setMinutes(now.getMinutes() - 2);
    const t1 = makeTimes(now);
    if (intention === "selling") {
      return [
        {
          author: "otherParticipant",
          dataSemQualifier: `otherParticipant-${t1[0]}`,
          localTime: t1[1],
          text: `Hi ${data.myName},
  
            I have a question about '${data.product.name}'.

            Is it still for sale?
      
            With best regards,
            ${data.opponentName}`,
        },
        {
          author: "me",
          dataSemQualifier: `me-${t2[0]}`,
          localTime: t2[1],
          text: `Yes, it is`,
          testStatus: "Read",
        },
        {
          author: "otherParticipant",
          dataSemQualifier: `otherParticipant-${t3[0]}`,
          localTime: t3[1],
          text: `What is your last price?`,
        },
      ]
    } else if (intention === "buying") {
      return [
        {
          author: "me",
          dataSemQualifier: `me-${t1[0]}`,
          localTime: t1[1],
          text: `Hi ${data.opponentName},
          
            I have a question about '${data.product.name}'.

            Is it still for sale?
      
            With best regards,
            ${data.opponentName}`,
          testStatus: "Gelezen",
        },
        {
          author: "otherParticipant",
          dataSemQualifier: `otherParticipant-${t2[0]}`,
          localTime: t2[1],
          text: `Hi ${data.myName}, yes still selling it.`,
        }
      ]
    }
    return [];
  }
}

const makeTimes = (date: Date): [string, string] => {
  const isoFormat = date.toISOString();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return [isoFormat, `${hours}:${minutesStr}`];
}