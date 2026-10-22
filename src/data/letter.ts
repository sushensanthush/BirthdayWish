/*! Birthday Exam © 2026 Sushen Santhush . — MIT License */
import { T } from "../config";

/**
 * The closing letter shown on the finale screen once every candle is blown out.
 * Edit the wording freely; `T` supplies the personalized values.
 * Two variants: family / friends, and boyfriend / girlfriend.
 */
export function buildLetter(): string[] {
  if (T.romantic) return buildRomanticLetter();

  const bond = T.siblings
    ? `Who would've thought my best friend would one day become my ${T.toRole} and someone so special to me? We might not be related by blood, but you're still my family, my dumb ${T.toRole}..`
    : `Who would've thought we'd end up this close? You're family in everything but name, my dumb ${T.toRole}..`;

  const grownUp = T.isAdult
    ? "You're officially an adult now. A terrifying thought for the rest of us."
    : `Level ${T.age} unlocked. A terrifying thought for the rest of us.`;

  return [
    `Dear ${T.name},`,
    `Honestly, I dunno how to write a letter properly, but well, here it is.. Happy ${T.ageOrdinal} birthday, you magnificent menace. Happy ${T.ageOrdinal} to my one and only annoying little ${T.toRole}! 🫂❤️ ${bond}`,
    `${grownUp} But between you and me, you'll always be the little crazy ${T.toRole} who is somehow smarter, cooler, and way more dramatic than me.`,
    `I hope your next chapter brings you happiness, beautiful memories, good food (that actually meets your standards 💀😂), and all the love you deserve. And whenever life gets hard, remember that your ${T.bigFromRole} is always here for you, especially when you need one of those tight hugs you love so much.`,
    `Whatever you wished for, I hope you get it. And if you don't, I'll get it for you. Again, Happy Birthday, nutcase! Stay crazy, stay happy, and never forget you've always got your ${T.bigFromRole}.`,
  ];
}

function buildRomanticLetter(): string[] {
  return [
    `Dear ${T.name},`,
    `Honestly, I dunno how to write a letter properly, but well, here it is.. Happy ${T.ageOrdinal} birthday to my favorite person in the whole world! 🫂❤️ Who would've thought the one who makes my ordinary days brighter would turn out to be my ${T.toRole}? Loving you is honestly the easiest thing I've ever done..`,
    `You're ${T.age} now and somehow still getting more amazing every year. Between you and me, you're smarter, cooler, and way more dramatic than I'll ever be, and I love every single bit of it.`,
    `I hope your next chapter brings you happiness, beautiful memories, good food (that actually meets your standards 💀😂), and all the love you deserve. And whenever life gets hard, remember that your ${T.fromRole} is always here for you, especially when you need one of those tight hugs you love so much.`,
    `Whatever you wished for, I hope you get it. And if you don't, I'll get it for you. Again, Happy Birthday! Stay crazy, stay happy, and never forget you've always got me right by your side.`,
  ];
}
