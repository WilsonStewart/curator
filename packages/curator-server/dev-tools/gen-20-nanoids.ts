import { genNanoid } from "@/lib/id-generators";

for (let i = 0; i < 20; i++) {
  console.log(genNanoid());
}
