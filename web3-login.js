const API = "https://rexek60-backend-production.up.railway.app";
let walletAddress = null;

async function connectMetaMask(){
 if(window.ethereum){
   const accounts = await ethereum.request({ method:"eth_requestAccounts" });
   walletAddress = accounts[0];
   alert("Bağlandı: " + walletAddress);
 } else { alert("MetaMask bulunamadı!"); }
}

function connectWalletConnect(){
 alert("WalletConnect placeholder aktif.");
 walletAddress = "walletconnect_demo";
}

function continueGame(){
 const name = document.getElementById("playerName").value;
 if(!walletAddress){ alert("Önce cüzdan bağla!"); return; }
 if(!name){ alert("İsim yaz!"); return; }

 localStorage.setItem("pengu_wallet", walletAddress);
 localStorage.setItem("pengu_name", name);
 window.location.href = "index.html";
}