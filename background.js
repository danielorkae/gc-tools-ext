function showPlayerKdr() {
  const getKDRColor = (kdr) => {
    if (kdr < 0.5) {
      return "#ff0000";
    } else if (kdr < 0.75) {
      return "#ffa500";
    } else if (kdr < 1) {
      return "#ffff00";
    } else {
      return "#00ff00";
    }
  };

  const showPlayerKDR = (player) => {
    const pInfoQuery = ".sala-lineup-imagem > .gc-avatar > a";
    let playerInfo = player?.querySelector(pInfoQuery)?.title;

    if (player.querySelector(".rs-player-kdr") || !playerInfo) {
      return;
    }

    const kdr = playerInfo?.split("KDR: ")[1]?.split(" ")[0];

    if (!kdr) {
      return;
    }

    let p = document.createElement("span");
    p.className = "rs-player-kdr";
    p.innerText = `KDR: ${kdr}`;
    p.style = `font-size: 9px; color: ${getKDRColor(kdr)}`;
    player.append(p);
  };

  let players = document.querySelectorAll(".sala-lineup-player");
  players.forEach(showPlayerKDR);

  document.addEventListener(
    "DOMNodeInserted",
    function (e) {
      if (e.target.className?.includes("sala-lineup-player")) {
        showPlayerKDR(e.target);
        return;
      }

      let players = e.target.querySelectorAll(".sala-lineup-player");
      players.forEach(showPlayerKDR);
      return;
    },
    false
  );
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("gamersclub.com.br/lobby")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showPlayerKdr,
    });
  }
});
