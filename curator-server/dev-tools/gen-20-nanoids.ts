import { genNanoid } from "@/util/id-generators";

for (let i = 0; i < 20; i++) {
  console.log(genNanoid());
}
