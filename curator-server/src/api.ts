import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound404Handler } from "@/middlewares/404-handler";
import pkgdotjson from "@/../package.json" assert { type: "json" };

export const api = new OpenAPIHono();

api.notFound(notFound404Handler);

// Generated at https://patorjk.com/software/taag/#p=display&f=Bloody&t=Curator%20Api
console.log(`
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
`);
console.log(`Package Name: ${pkgdotjson.name}`);
console.log(`Version:      ${pkgdotjson.version}`);
console.log("");
