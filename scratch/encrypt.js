import CryptoJS from 'crypto-js';

const players = [
    {
      "id": "player-1775766488264",
      "name": "rtmiselin",
      "avatar": "https://mc-heads.net/avatar/rtmiselin",
      "tierId": "tier-2",
      "categoryId": "cat-vanilla"
    },
    {
      "id": "player-1775766498612",
      "name": "rtmiselin",
      "avatar": "https://mc-heads.net/avatar/rtmiselin",
      "tierId": "tier-2",
      "categoryId": "cat-axe"
    },
    {
      "id": "player-1775766507317",
      "name": "matejamelko",
      "avatar": "https://mc-heads.net/avatar/matejamelko",
      "tierId": "tier-1",
      "categoryId": "cat-axe"
    },
    {
      "id": "player-1775823724223",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-1",
      "categoryId": "cat-overall"
    },
    {
      "id": "player-1775766522985",
      "name": "rtmiselin",
      "avatar": "https://mc-heads.net/avatar/rtmiselin",
      "tierId": "tier-2",
      "categoryId": "cat-overall"
    },
    {
      "id": "player-1775766551167",
      "name": "matejamelko",
      "avatar": "https://mc-heads.net/avatar/matejamelko",
      "tierId": "tier-1",
      "categoryId": "cat-vanilla"
    },
    {
      "id": "player-1775766559511",
      "name": "jako_andreas",
      "avatar": "https://mc-heads.net/avatar/jako_andreas",
      "tierId": "tier-4",
      "categoryId": "cat-vanilla"
    },
    {
      "id": "player-1775766581443",
      "name": "Planeta_Cz",
      "avatar": "https://mc-heads.net/avatar/Planeta_Cz",
      "tierId": "tier-2",
      "categoryId": "cat-sword"
    },
    {
      "id": "player-1775766615344",
      "name": "vojtamelko",
      "avatar": "https://mc-heads.net/avatar/vojtamelko",
      "tierId": "tier-2",
      "categoryId": "cat-mace"
    },
    {
      "id": "player-1775823527601",
      "name": "MAFINRIF560",
      "avatar": "https://mc-heads.net/avatar/MAFINRIF560",
      "tierId": "tier-8",
      "categoryId": "cat-smp"
    },
    {
      "id": "player-1775823605616",
      "name": "matejamelko",
      "avatar": "https://mc-heads.net/avatar/matejamelko",
      "tierId": "tier-1",
      "categoryId": "cat-mace"
    },
    {
      "id": "player-1775823616190",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-1",
      "categoryId": "cat-smp"
    },
    {
      "id": "player-1775823631691",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-3",
      "categoryId": "cat-vanilla"
    },
    {
      "id": "player-1775823641647",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-1",
      "categoryId": "cat-uhc"
    },
    {
      "id": "player-1775823655038",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-1",
      "categoryId": "cat-nethop"
    },
    {
      "id": "player-1775823664741",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-1",
      "categoryId": "cat-pot"
    },
    {
      "id": "player-1775823679924",
      "name": "Planeta_Cz",
      "avatar": "https://mc-heads.net/avatar/Planeta_Cz",
      "tierId": "tier-1",
      "categoryId": "cat-cheaters"
    },
    {
      "id": "player-1775823704675",
      "name": "patrikamel",
      "avatar": "https://mc-heads.net/avatar/patrikamel",
      "tierId": "tier-3",
      "categoryId": "cat-cheaters"
    },
    {
      "id": "player-1775823694970",
      "name": "jako_andreas",
      "avatar": "https://mc-heads.net/avatar/jako_andreas",
      "tierId": "tier-2",
      "categoryId": "cat-cheaters"
    },
    {
      "id": "player-1775832226609",
      "name": "matejamelko",
      "avatar": "https://mc-heads.net/avatar/matejamelko",
      "tierId": "tier-3",
      "categoryId": "cat-overall"
    }
  ];

const password = 'matejamelko123';
const encrypted = CryptoJS.AES.encrypt(JSON.stringify(players), password).toString();

console.log('--- ENCRYPTED PLAYERS ---');
console.log(encrypted);
console.log('--- ADMIN HASH (GG22) ---');
console.log(CryptoJS.SHA256('GG22').toString());
