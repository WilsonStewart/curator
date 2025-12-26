import env from "@/lib/dotenv";
import {
  GIT_BANNER_COMMIT_MESSAGE,
  GIT_CURRENT_BRANCH_NAME,
} from "@/lib/git-facts";
import pkgdotjson from "@/../package.json" assert { type: "json" };

// Generated at https://patorjk.com/software/taag/#p=display&f=Bloody&t=Curator%20Api
const apiFiglet = `
 ▄████▄   █    ██  ██▀███   ▄▄▄     ▄▄▄█████▓ ▒█████   ██▀███      ▄▄▄       ██▓███   ██▓
▒██▀ ▀█   ██  ▓██▒▓██ ▒ ██▒▒████▄   ▓  ██▒ ▓▒▒██▒  ██▒▓██ ▒ ██▒   ▒████▄    ▓██░  ██▒▓██▒
▒▓█    ▄ ▓██  ▒██░▓██ ░▄█ ▒▒██  ▀█▄ ▒ ▓██░ ▒░▒██░  ██▒▓██ ░▄█ ▒   ▒██  ▀█▄  ▓██░ ██▓▒▒██▒
▒▓▓▄ ▄██▒▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██░ ▓██▓ ░ ▒██   ██░▒██▀▀█▄     ░██▄▄▄▄██ ▒██▄█▓▒ ▒░██░
▒ ▓███▀ ░▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒ ▒██▒ ░ ░ ████▓▒░░██▓ ▒██▒    ▓█   ▓██▒▒██▒ ░  ░░██░
░ ░▒ ▒  ░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ▒ ░░   ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░    ▒▒   ▓▒█░▒▓▒░ ░  ░░▓  
  ░  ▒   ░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░   ░      ░ ▒ ▒░   ░▒ ░ ▒░     ▒   ▒▒ ░░▒ ░      ▒ ░
░         ░░░ ░ ░   ░░   ░   ░   ▒    ░      ░ ░ ░ ▒    ░░   ░      ░   ▒   ░░        ▒ ░
░ ░         ░        ░           ░  ░            ░ ░     ░              ░  ░          ░  
░                                                                                        
`;

// Generated at https://patorjk.com/software/taag/#p=display&f=Bloody&t=Curator%20Super
const superFiglet = `

 ▄████▄   █    ██  ██▀███   ▄▄▄     ▄▄▄█████▓ ▒█████   ██▀███       ██████  █    ██  ██▓███  ▓█████  ██▀███  
▒██▀ ▀█   ██  ▓██▒▓██ ▒ ██▒▒████▄   ▓  ██▒ ▓▒▒██▒  ██▒▓██ ▒ ██▒   ▒██    ▒  ██  ▓██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒
▒▓█    ▄ ▓██  ▒██░▓██ ░▄█ ▒▒██  ▀█▄ ▒ ▓██░ ▒░▒██░  ██▒▓██ ░▄█ ▒   ░ ▓██▄   ▓██  ▒██░▓██░ ██▓▒▒███   ▓██ ░▄█ ▒
▒▓▓▄ ▄██▒▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██░ ▓██▓ ░ ▒██   ██░▒██▀▀█▄       ▒   ██▒▓▓█  ░██░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  
▒ ▓███▀ ░▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒ ▒██▒ ░ ░ ████▓▒░░██▓ ▒██▒   ▒██████▒▒▒▒█████▓ ▒██▒ ░  ░░▒████▒░██▓ ▒██▒
░ ░▒ ▒  ░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ▒ ░░   ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░   ▒ ▒▓▒ ▒ ░░▒▓▒ ▒ ▒ ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░
  ░  ▒   ░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░   ░      ░ ▒ ▒░   ░▒ ░ ▒░   ░ ░▒  ░ ░░░▒░ ░ ░ ░▒ ░      ░ ░  ░  ░▒ ░ ▒░
░         ░░░ ░ ░   ░░   ░   ░   ▒    ░      ░ ░ ░ ▒    ░░   ░    ░  ░  ░   ░░░ ░ ░ ░░          ░     ░░   ░ 
░ ░         ░        ░           ░  ░            ░ ░     ░              ░     ░                 ░  ░   ░     
░                                                                                                            
`;

// Generated at https://patorjk.com/software/taag/#p=display&f=Bloody&t=Curator%20Worker
export const workerFiglet = `
 ▄████▄   █    ██  ██▀███   ▄▄▄     ▄▄▄█████▓ ▒█████   ██▀███      █     █░ ▒█████   ██▀███   ██ ▄█▀▓█████  ██▀███  
▒██▀ ▀█   ██  ▓██▒▓██ ▒ ██▒▒████▄   ▓  ██▒ ▓▒▒██▒  ██▒▓██ ▒ ██▒   ▓█░ █ ░█░▒██▒  ██▒▓██ ▒ ██▒ ██▄█▒ ▓█   ▀ ▓██ ▒ ██▒
▒▓█    ▄ ▓██  ▒██░▓██ ░▄█ ▒▒██  ▀█▄ ▒ ▓██░ ▒░▒██░  ██▒▓██ ░▄█ ▒   ▒█░ █ ░█ ▒██░  ██▒▓██ ░▄█ ▒▓███▄░ ▒███   ▓██ ░▄█ ▒
▒▓▓▄ ▄██▒▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██░ ▓██▓ ░ ▒██   ██░▒██▀▀█▄     ░█░ █ ░█ ▒██   ██░▒██▀▀█▄  ▓██ █▄ ▒▓█  ▄ ▒██▀▀█▄  
▒ ▓███▀ ░▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒ ▒██▒ ░ ░ ████▓▒░░██▓ ▒██▒   ░░██▒██▓ ░ ████▓▒░░██▓ ▒██▒▒██▒ █▄░▒████▒░██▓ ▒██▒
░ ░▒ ▒  ░░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░ ▒ ░░   ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░   ░ ▓░▒ ▒  ░ ▒░▒░▒░ ░ ▒▓ ░▒▓░▒ ▒▒ ▓▒░░ ▒░ ░░ ▒▓ ░▒▓░
  ░  ▒   ░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░   ░      ░ ▒ ▒░   ░▒ ░ ▒░     ▒ ░ ░    ░ ▒ ▒░   ░▒ ░ ▒░░ ░▒ ▒░ ░ ░  ░  ░▒ ░ ▒░
░         ░░░ ░ ░   ░░   ░   ░   ▒    ░      ░ ░ ░ ▒    ░░   ░      ░   ░  ░ ░ ░ ▒    ░░   ░ ░ ░░ ░    ░     ░░   ░ 
░ ░         ░        ░           ░  ░            ░ ░     ░            ░        ░ ░     ░     ░  ░      ░  ░   ░     
░                                                                                                                   
`;

export const printBanner = () => {
  switch (env.CURATOR_MODE) {
    case "api":
      console.log(apiFiglet);
      break;
    case "boss":
      console.log(superFiglet);
      break;
    case "worker":
      console.log(workerFiglet);
      break;
  }
  console.log(`Started at:          ${new Date()}`);
  console.log(`Package name:        ${pkgdotjson.name}`);
  console.log(`Package version:     ${pkgdotjson.version}`);
  console.log(`NODE_ENV:            ${env.NODE_ENV}`);
  console.log(`CURATOR_MODE:        ${env.CURATOR_MODE}`);
  // console.log(`Git branch:          ${GIT_CURRENT_BRANCH_NAME}`);
  // console.log(`Git commit:          ${GIT_BANNER_COMMIT_MESSAGE}`);
  if (env.CURATOR_MODE === "api") {
    console.log(
      `OpenAPI endpoint:    http://localhost:${env.SERVER_PORT}/api/openapi.json`,
    );
    console.log(
      `Scaler endpoint:     http://localhost:${env.SERVER_PORT}/api/docs`,
    );
    console.log(
      `better-auth docs:    http://localhost:${env.SERVER_PORT}/api/auth/reference`,
    );
  }
  console.log("");
};
