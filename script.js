const contractAddress = "0xeA0543f735D5fF0c261cE8Fc7203dE4BaE9E6427";
const abi = [	{
	"inputs": [],
	"stateMutability": "nonpayable",
	"type": "constructor"
},
{
	"anonymous": false,
	"inputs": [],
	"name": "BookingsCleared",
	"type": "event"
},
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_roomId",
			"type": "string"
		}
	],
	"name": "bookRoom",
	"outputs": [],
	"stateMutability": "payable",
	"type": "function"
},
{
	"inputs": [],
	"name": "clearBookings",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"anonymous": false,
	"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "guest",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "string",
			"name": "roomId",
			"type": "string"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
	],
	"name": "RoomBooked",
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
	"name": "allRooms",
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
	"inputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
	],
	"name": "bookings",
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
	"name": "FLOOR_A_PRICE",
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
	"name": "FLOOR_B_PRICE",
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
	"name": "FLOOR_C_PRICE",
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
	"name": "getBookedRooms",
	"outputs": [
		{
			"internalType": "string[]",
			"name": "",
			"type": "string[]"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
{
	"inputs": [
		{
			"internalType": "string",
			"name": "_roomId",
			"type": "string"
		}
	],
	"name": "getRoomPrice",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "pure",
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
}]; // (อันนี้คงไว้เหมือนเดิมที่คุณส่งมา)

let provider, signer, contract;
let selectedRoom = null;
let selectedFloor = null; // ⭐ เพิ่มตัวแปรเก็บชั้นที่เลือก

async function connectWallet() {
  if (!window.ethereum) return alert("Please install MetaMask");

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, abi, signer);

  const address = await signer.getAddress();
  document.getElementById("walletAddress").innerText = address;

  const balance = await provider.getBalance(address);
  document.getElementById("balance").innerText = ethers.utils.formatEther(balance) + " ETH";

  document.getElementById("status").innerText = "✅ Wallet connected.";
  document.getElementById("floorSelection").style.display = "block"; // ⭐ แสดงปุ่มเลือกชั้น
}

// ⭐ ฟังก์ชันเลือกชั้น
function selectFloor(floor) {
  selectedFloor = floor;
  document.getElementById("floorSelection").style.display = "none"; // เลือกแล้วซ่อนปุ่ม
  loadRooms();
}

// แก้ loadRooms ให้โหลดเฉพาะชั้นที่เลือก
async function loadRooms() {
  const roomContainer = document.getElementById("roomContainer");
  roomContainer.innerHTML = "";

  if (!selectedFloor) {
    return alert("Please select a floor first.");
  }

  const allRooms = [];
  for (let i = 1; i <= 10; i++) {
    const number = i < 10 ? `0${i}` : `${i}`;
    allRooms.push(`${selectedFloor}${number}`);
  }

  const booked = await contract.getBookedRooms();

  for (let room of allRooms) {
    const div = document.createElement("div");
    div.className = "room" + (booked.includes(room) ? " booked" : "");
    div.innerText = room;
    if (!booked.includes(room)) {
      div.onclick = () => {
        selectedRoom = room;
        document.getElementById("selectedRoom").innerText = room;
      };
    }
    roomContainer.appendChild(div);
  }
}



async function bookSelectedRoom() {
  if (!selectedRoom) return alert("Please select a room");

  const price = await contract.getRoomPrice(selectedRoom);
  try {
    const tx = await contract.bookRoom(selectedRoom, { value: price });
    document.getElementById("status").innerText = "🔄 Booking...";
    await tx.wait();
    document.getElementById("status").innerText = "✅ Room booked!";
    selectedRoom = null;
    document.getElementById("selectedRoom").innerText = "None";
    await loadRooms();
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Booking failed.";
  }
}

async function clearAllBookings() {
  try {
    const tx = await contract.clearBookings();
    await tx.wait();
    document.getElementById("status").innerText = "✅ Cleared all bookings!";
    await loadRooms();
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "❌ Failed to clear bookings.";
  }
}

function disconnect() {
  signer = null;
  provider = null;
  contract = null;
  selectedRoom = null;
  selectedFloor = null;
  document.getElementById("walletAddress").innerText = "Disconnected";
  document.getElementById("balance").innerText = "-";
  document.getElementById("roomContainer").innerHTML = "";
  document.getElementById("selectedRoom").innerText = "None";
  document.getElementById("status").innerText = "Wallet disconnected.";
}
