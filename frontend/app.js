// Замените "АДРЕС_ДЕПЛОЯ" на адрес вашего задеплоенного контракта
const contractAddress = "0x38FE82f5224Ae9ED2F29c474405270d9DeC87077";

// ABI вашего контракта VotingService
// Его можно найти в файле artifacts/src/VotingService.sol/VotingService.json после компиляции
// внутри поля "abi"
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "question",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "numVotesToFinish",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "voteValue",
        "type": "uint256"
      }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "question",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votesFor",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "votesAgainst",
        "type": "uint256"
      }
    ],
    "name": "VotingFinished",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "getVoterAtIndex",
    "outputs": [
      {
        "internalType": "address",
        "name": "voter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "hasVoted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
    }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "vote",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "voted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "countVotes",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "votesFor",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "votesAgainst",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "finishVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVotingStatus",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showVoteQuestion",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "showVoteRules",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteAgainst",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteFor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteQuestion",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voterAddresses",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voterCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "numberOfVotesToFinish",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "countVotesFor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "countVotesAgainst",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "status",
    "outputs": [
      {
        "internalType": "enum VotingService.VoteStatus",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// --- Элементы DOM ---
const connectBtn = document.getElementById("connectBtn");
const voteForBtn = document.getElementById("voteForBtn");
const voteAgainstBtn = document.getElementById("voteAgainstBtn");
const finishVotingBtn = document.getElementById("finishVotingBtn");
const votingButtons = document.getElementById("votingButtons");
const voteQuestionEl = document.getElementById("voteQuestion");
const statusEl = document.getElementById("status");
const countForEl = document.getElementById("countFor");
const countAgainstEl = document.getElementById("countAgainst");
const voterCountEl = document.getElementById("voterCount");
const progressFor = document.getElementById("progressFor");
const progressAgainst = document.getElementById("progressAgainst");
const votesList = document.getElementById("votesList");

let provider, signer, contract, userAddress;

// --- Подключение к MetaMask ---
connectBtn.onclick = async () => {
    if (!window.ethereum) {
        alert("Установите MetaMask!");
        return;
    }
    try {
        provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = await provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        userAddress = await signer.getAddress();

        connectBtn.innerText = `Подключено: ${userAddress.slice(0, 6)}...`;
        // Проверяем, является ли пользователь владельцем
        checkOwner();
        // Загружаем начальные данные
        await loadContractData();
        // Включаем кнопки голосования
        votingButtons.style.display = 'block';
    } catch (err) {
        console.error(err);
        alert(`Ошибка подключения: ${err.message}`);
    }
};

// --- Проверка владельца ---
async function checkOwner() {
    try {
        const owner = await contract.owner();
        const isOwner = userAddress.toLowerCase() === owner.toLowerCase();
        finishVotingBtn.disabled = !isOwner;
    } catch (err) {
        console.error("Ошибка проверки владельца:", err);
    }
}

// --- Загрузка данных с контракта ---
async function loadContractData() {
    if (!contract) return;

    try {
        const question = await contract.showVoteQuestion();
        const status = await contract.getVotingStatus();
        const [votesFor, votesAgainst] = await contract.countVotes();
        const voterCount = await contract.voterCount();

        voteQuestionEl.textContent = question;
        statusEl.textContent = status;
        countForEl.textContent = votesFor.toString();
        countAgainstEl.textContent = votesAgainst.toString();
        voterCountEl.textContent = voterCount.toString();

        // Обновляем прогресс-бар
        const totalVotes = votesFor + votesAgainst;
        if (totalVotes > 0) {
            const percentFor = (votesFor / totalVotes) * 100;
            const percentAgainst = (votesAgainst / totalVotes) * 100;
            progressFor.style.width = `${percentFor}%`;
            progressAgainst.style.width = `${percentAgainst}%`;
        } else {
            progressFor.style.width = "0%";
            progressAgainst.style.width = "0%";
        }

        // Обновляем историю голосов
        votesList.innerHTML = "";
        for (let i = 0; i < voterCount; i++) {
            const [voter, voteValue, hasVoted] = await contract.getVoterAtIndex(i);
            if (hasVoted) {
                const li = document.createElement("li");
                const voteText = voteValue === 2 ? "За" : (voteValue === 1 ? "Против" : "Неизвестно");
                li.textContent = `${voter}: ${voteText}`;
                votesList.appendChild(li);
            }
        }

    } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        alert(`Ошибка загрузки данных: ${err.message}`);
    }
}

// --- Обработчики кнопок ---
voteForBtn.onclick = async () => {
    if (!contract) return alert("Сначала подключите MetaMask!");
    try {
        // Проверим статус перед голосованием
        const status = await contract.getVotingStatus();
        if (status !== "Active") {
            alert("Голосование уже завершено.");
            return;
        }
        const tx = await contract.voteFor();
        await tx.wait(); // Ждем подтверждения транзакции
        await loadContractData(); // Обновляем данные после успешного голосования
    } catch (err) {
        console.error("Ошибка голосования 'За':", err);
        alert(`Ошибка голосования 'За': ${err.message}`);
    }
};

voteAgainstBtn.onclick = async () => {
    if (!contract) return alert("Сначала подключите MetaMask!");
    try {
        const status = await contract.getVotingStatus();
        if (status !== "Active") {
            alert("Голосование уже завершено.");
            return;
        }
        const tx = await contract.voteAgainst();
        await tx.wait();
        await loadContractData();
    } catch (err) {
        console.error("Ошибка голосования 'Против':", err);
        alert(`Ошибка голосования 'Против': ${err.message}`);
    }
};

finishVotingBtn.onclick = async () => {
    if (!contract) return alert("Сначала подключите MetaMask!");
    try {
        const tx = await contract.finishVoting();
        await tx.wait();
        await loadContractData();
    } catch (err) {
        console.error("Ошибка завершения голосования:", err);
        alert(`Ошибка завершения голосования: ${err.message}`);
    }
};

// Загружаем данные при загрузке страницы (без подключенного кошелька)
window.addEventListener("DOMContentLoaded", async () => {
    // Попробуем создать только Provider для чтения данных без подписи
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        // Создаем контракт с Provider, а не Signer, для чтения
        const readOnlyContract = new ethers.Contract(contractAddress, abi, provider);
        try {
            const question = await readOnlyContract.showVoteQuestion();
            const status = await readOnlyContract.getVotingStatus();
            const [votesFor, votesAgainst] = await readOnlyContract.countVotes();
            const voterCount = await readOnlyContract.voterCount();

            voteQuestionEl.textContent = question;
            statusEl.textContent = status;
            countForEl.textContent = votesFor.toString();
            countAgainstEl.textContent = votesAgainst.toString();
            voterCountEl.textContent = voterCount.toString();

            const totalVotes = votesFor + votesAgainst;
            if (totalVotes > 0) {
                const percentFor = (votesFor / totalVotes) * 100;
                const percentAgainst = (votesAgainst / totalVotes) * 100;
                progressFor.style.width = `${percentFor}%`;
                progressAgainst.style.width = `${percentAgainst}%`;
            }
        } catch (e) {
            console.error("Не удалось загрузить данные без подключения:", e);
        }
    }
});