const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".", 
    ownerName: process.env.OWNER_NAME || "Supalarry",
    ownerNumber: process.env.OWNER_NUMBER || "233549681290",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Ghana",
    botName: process.env.BOT_NAME || "OP LARRY",
    exifPack: process.env.EXIF_PACK || "LARRY",
    exifAuthor: process.env.EXIF_AUTHOR || "LARRY",
    timeZone: process.env.TIME_ZONE || "Africa/ACCRA",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "false" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "false" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "false" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0oxRnRIQk1xNmxnWjFTRXAzWCt1VVhucnJyNmY1a2pLbVc4QXRUVkYwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1dCSVVXUEorRXdyVTdxY3Q0TkI3dlFWcmVma0JKbkg1QzVaRE02RGcyUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4RHpyVHhRWFFnMDByVHplc0xpZklPczAwWm9WWUJqMlpUTlZaNTJlZ2xrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYTGV5eTl6N0dzQ3UzRzJ5bk9Wd1h4VzJ0YnkrRmNMZlcwYTFnbkxhOVhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1KaHlxaDJ0NVpnQWVUVTZDWm5NWjRSLzVLaC91cWk0VTFvaWszbUs4SFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFwOW5NSUt2VWZmc3FIV2dJNkY2aVpscEU4NDhSNUYwSGhvWStEMVJNVE09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVBlcnFTQzN3bHpwODhnN1BPS0N4amYyY3AreHlCV285UVVUMFJ0YVhWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSEgxeG0zdGcyemZWV05VWFRGak9NUkpQYWh4amE4djZQdEFOY0ZzSlpSOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9IdnZMUUoxOFVER0UzZkhPQlBSQ3RsV1ZhV01qdkkwZm9pN3Q4ZTVjcDFiQlgrRnlCdFlPMWRNeDhPYWpiTWlKdUsvRWdUaG9JL1lucmEvS1BaMENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAsImFkdlNlY3JldEtleSI6IkhlQWtVeTNkRFpqWDBYTm1UV1VBdW9xWW91TENSM3VNdHFWQ0ZOZjF5WTA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllFQzZZQVJDIiwibWUiOnsiaWQiOiIyMzM1NDk2ODEyOTA6MjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI2NzYyNDY2Mjc1MzQ4MToyMUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pQYXI0a0ZFS0hFbnNBR0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVyZnpZdEZoQmw2NGdHUU9oVTBRVWt1bHZFRjgvNGMyLzFWbS90VjNreU09IiwiYWNjb3VudFNpZ25hdHVyZSI6IkEveU0ycTlheWdSbzU2OUpuMlA2VHIyVmdHR0hzVy8raVpTK3BVQ0hyWmJwZFQvVi96L1ZISHR1N0QvVUdOYzAxT0NVNU5YaXlyUTFSaEFHTTVScWpnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnYXhzR1JEVDJNN1ZjSGh5NXQ5d0RoRG5xWmRmdmlQWExBTzcxNU1GR3hkaldsN29ndEUzd2F6aVFTenlhWlJubHE0Z1o0bXhOdmpkdndIdUZRUkZDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU0OTY4MTI5MDoyMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJicTM4MkxSWVFaZXVJQmtEb1ZORUZKTHBieEJmUCtITnY5Vlp2N1ZkNU1qIn19XSwicGxhdGZvcm0iOiJpcGhvbmUiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lEUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTMzMDczNCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFJQUFGOHMifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "false" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "false
        " || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
