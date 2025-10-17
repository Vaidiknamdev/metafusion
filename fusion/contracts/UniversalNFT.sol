
// #################################################################
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

// --------------------------------------------------
// Universal Account ID + UEAFactory Interface
// --------------------------------------------------
struct UniversalAccountId {
    string chainNamespace;
    string chainId;
    bytes owner;
}

interface IUEAFactory {
    function getOriginForUEA(address addr)
        external
        view
        returns (UniversalAccountId memory account, bool isUEA);
}

// --------------------------------------------------
// Universal NFT Contract
// --------------------------------------------------
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract UniversalNFT is ERC721, Ownable {
    struct NFTData {
        string name;
        string description;
        string image;
        uint256 price;
        string originChainNamespace;
        string originChainId;
        address creator;
        uint256 totalTips;
        bool isListed;
    }

    uint256 public tokenCounter;
    mapping(uint256 => NFTData) public nftDetails;

    // ✅ Dynamic — set via constructor
    address public UEA_FACTORY_ADDR;

    event NFTMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string chainNamespace,
        string chainId
    );
    event NFTBought(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price,
        string buyerChainNamespace
    );
    event TipSent(
        address indexed creator,
        address indexed sender,
        uint256 amount,
        string senderChainNamespace
    );

    // ✅ Accept factory address dynamically during deployment
    constructor(address _ueaFactoryAddr) ERC721("UniversalNFT", "UNFT") {
        UEA_FACTORY_ADDR = _ueaFactoryAddr;
        tokenCounter = 0;
    }

    receive() external payable {}

    // ✅ Universal mintNFT (detects origin chain)
    function mintNFT(
        string memory _name,
        string memory _description,
        string memory _image,
        uint256 _price
    ) external {
        tokenCounter++;
        uint256 newTokenId = tokenCounter;
        _mint(msg.sender, newTokenId);

        string memory chainNamespace;
        string memory chainId;

        // Detect user’s origin using UEA Factory
        try
            IUEAFactory(UEA_FACTORY_ADDR).getOriginForUEA(msg.sender)
        returns (UniversalAccountId memory origin, bool isUEA) {
            if (!isUEA) {
                // Native Push user
                chainNamespace = "push";
                chainId = "111551119"; // Push Donut Testnet
            } else {
                bytes32 chainHash = keccak256(
                    abi.encodePacked(origin.chainNamespace, origin.chainId)
                );
                if (
                    chainHash ==
                    keccak256(abi.encodePacked("eip155", "11155111"))
                ) {
                    chainNamespace = "eip155";
                    chainId = "11155111"; // Sepolia
                } else if (
                    chainHash ==
                    keccak256(
                        abi.encodePacked(
                            "solana",
                            "EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
                        )
                    )
                ) {
                    chainNamespace = "solana";
                    chainId = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1";
                } else {
                    chainNamespace = origin.chainNamespace;
                    chainId = origin.chainId;
                }
            }
        } catch {
            // fallback default if detection fails
            chainNamespace = "eip155";
            chainId = "11155111";
        }

        nftDetails[newTokenId] = NFTData({
            name: _name,
            description: _description,
            image: _image,
            price: _price,
            originChainNamespace: chainNamespace,
            originChainId: chainId,
            creator: msg.sender,
            totalTips: 0,
            isListed: true
        });

        emit NFTMinted(newTokenId, msg.sender, chainNamespace, chainId);
    }

    function buyNFT(uint256 _tokenId) external payable {
        NFTData storage data = nftDetails[_tokenId];
        require(data.isListed, "NFT not for sale");
        require(msg.value >= data.price, "Insufficient payment");
        require(msg.sender != ownerOf(_tokenId), "Already owner");

        address seller = ownerOf(_tokenId);
        _transfer(seller, msg.sender, _tokenId);
        payable(seller).transfer(msg.value);
        data.isListed = false;

        emit NFTBought(
            _tokenId,
            msg.sender,
            msg.value,
            data.originChainNamespace
        );
    }

    function tipCreator(uint256 _tokenId) external payable {
        NFTData storage data = nftDetails[_tokenId];
        require(msg.value > 0, "No tip sent");

        data.totalTips += msg.value;
        payable(data.creator).transfer(msg.value);

        emit TipSent(
            data.creator,
            msg.sender,
            msg.value,
            data.originChainNamespace
        );
    }

    function getNFTDetails(uint256 _tokenId)
        external
        view
        returns (NFTData memory)
    {
        return nftDetails[_tokenId];
    }
}




























// pragma solidity ^0.8.22;

// // --------------------------------------------------
// // Universal Account ID + UEAFactory Interface
// // --------------------------------------------------
// struct UniversalAccountId {
//     string chainNamespace;
//     string chainId;
//     bytes owner;
// }

// interface IUEAFactory {
//     function getOriginForUEA(address addr)
//         external
//         view
//         returns (UniversalAccountId memory account, bool isUEA);
// }

// // --------------------------------------------------
// // Universal NFT Contract
// // --------------------------------------------------
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// contract UniversalNFT is ERC721, Ownable {
//     struct NFTData {
//         string name;
//         string description;
//         string image;
//         uint256 price;
//         string originChainNamespace;
//         string originChainId;
//         address creator;
//         uint256 totalTips;
//         bool isListed;
//     }

//     uint256 public tokenCounter;
//     mapping(uint256 => NFTData) public nftDetails;

//     // ✅ Push Chain’s native UEA Factory (always constant on Donut Testnet)
//     address public constant UEA_FACTORY_ADDR =
//         0x00000000000000000000000000000000000000eA;

//     event NFTMinted(
//         uint256 indexed tokenId,
//         address indexed creator,
//         string chainNamespace,
//         string chainId
//     );
//     event NFTBought(
//         uint256 indexed tokenId,
//         address indexed buyer,
//         uint256 price,
//         string buyerChainNamespace
//     );
//     event TipSent(
//         address indexed creator,
//         address indexed sender,
//         uint256 amount,
//         string senderChainNamespace
//     );

//     constructor() ERC721("UniversalNFT", "UNFT") {
//         tokenCounter = 0;
//     }

//     receive() external payable {}

//     // ✅ Universal mintNFT (detects origin chain)
//     function mintNFT(
//         string memory _name,
//         string memory _description,
//         string memory _image,
//         uint256 _price
//     ) external {
//         tokenCounter++;
//         uint256 newTokenId = tokenCounter;
//         _mint(msg.sender, newTokenId);

//         string memory chainNamespace;
//         string memory chainId;

//         // Detect user’s origin using UEA Factory
//         try
//             IUEAFactory(UEA_FACTORY_ADDR).getOriginForUEA(msg.sender)
//         returns (UniversalAccountId memory origin, bool isUEA) {
//             if (!isUEA) {
//                 // Native Push user
//                 chainNamespace = "push";
//                 chainId = "111551119"; // Push Donut Testnet
//             } else {
//                 bytes32 chainHash = keccak256(
//                     abi.encodePacked(origin.chainNamespace, origin.chainId)
//                 );
//                 if (
//                     chainHash ==
//                     keccak256(abi.encodePacked("eip155", "11155111"))
//                 ) {
//                     chainNamespace = "eip155";
//                     chainId = "11155111"; // Sepolia
//                 } else if (
//                     chainHash ==
//                     keccak256(
//                         abi.encodePacked(
//                             "solana",
//                             "EtWTRABZaYq6iMfeYKouRu166VU2xqa1"
//                         )
//                     )
//                 ) {
//                     chainNamespace = "solana";
//                     chainId = "EtWTRABZaYq6iMfeYKouRu166VU2xqa1";
//                 } else {
//                     chainNamespace = origin.chainNamespace;
//                     chainId = origin.chainId;
//                 }
//             }
//         } catch {
//             // fallback default
//             chainNamespace = "eip155";
//             chainId = "11155111";
//         }

//         nftDetails[newTokenId] = NFTData({
//             name: _name,
//             description: _description,
//             image: _image,
//             price: _price,
//             originChainNamespace: chainNamespace,
//             originChainId: chainId,
//             creator: msg.sender,
//             totalTips: 0,
//             isListed: true
//         });

//         emit NFTMinted(newTokenId, msg.sender, chainNamespace, chainId);
//     }

//     function buyNFT(uint256 _tokenId) external payable {
//         NFTData storage data = nftDetails[_tokenId];
//         require(data.isListed, "NFT not for sale");
//         require(msg.value >= data.price, "Insufficient payment");
//         require(msg.sender != ownerOf(_tokenId), "Already owner");

//         address seller = ownerOf(_tokenId);
//         _transfer(seller, msg.sender, _tokenId);
//         payable(seller).transfer(msg.value);
//         data.isListed = false;

//         emit NFTBought(_tokenId, msg.sender, msg.value, data.originChainNamespace);
//     }

//     function tipCreator(uint256 _tokenId) external payable {
//         NFTData storage data = nftDetails[_tokenId];
//         require(msg.value > 0, "No tip sent");

//         data.totalTips += msg.value;
//         payable(data.creator).transfer(msg.value);

//         emit TipSent(data.creator, msg.sender, msg.value, data.originChainNamespace);
//     }

//     function getNFTDetails(uint256 _tokenId)
//         external
//         view
//         returns (NFTData memory)
//     {
//         return nftDetails[_tokenId];
//     }
// }

// pragma solidity ^0.8.22;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// interface IUEAFactory {
//     function getOriginForUEA(address user) external view returns (
//         string memory chainNamespace,
//         string memory chainId,
//         bytes memory ownerBytes
//     );
// }

// contract UniversalNFT is ERC721, Ownable {
//     struct NFTData {
//         string name;
//         string description;
//         string image;
//         uint256 price;
//         string originChainNamespace;
//         string originChainId;
//         address creator;
//         uint256 totalTips;
//         bool isListed;
//     }

//     uint256 public tokenCounter;
//     mapping(uint256 => NFTData) public nftDetails;
//     IUEAFactory public ueaFactory;

//     event NFTMinted(uint256 indexed tokenId, address indexed creator, string chainNamespace, string chainId);
//     event NFTBought(uint256 indexed tokenId, address indexed buyer, uint256 price, string buyerChainNamespace);
//     event TipSent(address indexed creator, address indexed sender, uint256 amount, string senderChainNamespace);

//     constructor(address _ueaFactory) ERC721("UniversalNFT", "UNFT") {
//         tokenCounter = 0;
//         ueaFactory = IUEAFactory(_ueaFactory);
//     }

//     receive() external payable {}
//     fallback() external payable {}

//     // ✅ Safe mint function (works with Push Donut + Sepolia)
//     function mintNFT(
//         string memory _name,
//         string memory _description,
//         string memory _image,
//         uint256 _price
//     ) external {
//         tokenCounter++;
//         uint256 newTokenId = tokenCounter;
//         _mint(msg.sender, newTokenId);

//         string memory chainNamespace;
//         string memory chainId;

//         // Try to get UEA origin info; fallback for EVM wallets
//         try ueaFactory.getOriginForUEA(msg.sender) returns (
//             string memory ns,
//             string memory cid,
//             bytes memory
//         ) {
//             chainNamespace = ns;
//             chainId = cid;
//         } catch {
//             chainNamespace = "eip155";
//             chainId = "11155111"; // Sepolia Chain ID
//         }

//         nftDetails[newTokenId] = NFTData({
//             name: _name,
//             description: _description,
//             image: _image,
//             price: _price,
//             originChainNamespace: chainNamespace,
//             originChainId: chainId,
//             creator: msg.sender,
//             totalTips: 0,
//             isListed: true
//         });

//         emit NFTMinted(newTokenId, msg.sender, chainNamespace, chainId);
//     }

//     // ✅ Safe buyNFT (works across chains)
//     function buyNFT(uint256 _tokenId) external payable {
//         NFTData storage data = nftDetails[_tokenId];
//         require(data.isListed, "NFT not for sale");
//         require(msg.value >= data.price, "Insufficient payment");
//         require(msg.sender != ownerOf(_tokenId), "Already owner");

//         address seller = ownerOf(_tokenId);
//         _transfer(seller, msg.sender, _tokenId);
//         payable(seller).transfer(msg.value);
//         data.isListed = false;

//         string memory chainNamespace;
//         // Fallback-safe chain info
//         try ueaFactory.getOriginForUEA(msg.sender) returns (
//             string memory ns,
//             string memory,
//             bytes memory
//         ) {
//             chainNamespace = ns;
//         } catch {
//             chainNamespace = "eip155";
//         }

//         emit NFTBought(_tokenId, msg.sender, msg.value, chainNamespace);
//     }

//     // ✅ Safe tipCreator (works across chains)
//     function tipCreator(uint256 _tokenId) external payable {
//         NFTData storage data = nftDetails[_tokenId];
//         require(msg.value > 0, "No tip sent");

//         data.totalTips += msg.value;
//         payable(data.creator).transfer(msg.value);

//         string memory chainNamespace;
//         // Fallback-safe chain info
//         try ueaFactory.getOriginForUEA(msg.sender) returns (
//             string memory ns,
//             string memory,
//             bytes memory
//         ) {
//             chainNamespace = ns;
//         } catch {
//             chainNamespace = "eip155";
//         }

//         emit TipSent(data.creator, msg.sender, msg.value, chainNamespace);
//     }

//     function listNFT(uint256 _tokenId, uint256 _price) external {
//         require(ownerOf(_tokenId) == msg.sender, "Not owner");
//         NFTData storage data = nftDetails[_tokenId];
//         data.price = _price;
//         data.isListed = true;
//     }

//     function getNFTDetails(uint256 _tokenId) external view returns (NFTData memory) {
//         return nftDetails[_tokenId];
//     }
// }





















// pragma solidity ^0.8.22;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";

// interface IUEAFactory {
//     function getOriginForUEA(address user) external view returns (
//         string memory chainNamespace,
//         string memory chainId,
//         bytes memory ownerBytes
//     );
// }

// contract UniversalNFT is ERC721, Ownable {
//     struct NFTData {
//         string name;
//         string description;
//         string image;
//         uint256 price;
//         string originChainNamespace;
//         string originChainId;
//         address creator;
//         uint256 totalTips;
//         bool isListed;
//     }

//     uint256 public tokenCounter;
//     mapping(uint256 => NFTData) public nftDetails;
//     IUEAFactory public ueaFactory;

//     event NFTMinted(uint256 indexed tokenId, address indexed creator, string chainNamespace, string chainId);
//     event NFTBought(uint256 indexed tokenId, address indexed buyer, uint256 price, string buyerChainNamespace);
//     event TipSent(address indexed creator, address indexed sender, uint256 amount, string senderChainNamespace);

//     constructor(address _ueaFactory) ERC721("UniversalNFT", "UNFT") {
//         tokenCounter = 0;
//         ueaFactory = IUEAFactory(_ueaFactory);
//     }

//     receive() external payable {}
//     fallback() external payable {}

//     function mintNFT(string memory _name, string memory _description, string memory _image, uint256 _price) external {
//         tokenCounter++;
//         uint256 newTokenId = tokenCounter;

//         _mint(msg.sender, newTokenId);

//         (string memory chainNamespace, string memory chainId, ) = ueaFactory.getOriginForUEA(msg.sender);

//         nftDetails[newTokenId] = NFTData({
//             name: _name,
//             description: _description,
//             image: _image,
//             price: _price,
//             originChainNamespace: chainNamespace,
//             originChainId: chainId,
//             creator: msg.sender,
//             totalTips: 0,
//             isListed: true
//         });

//         emit NFTMinted(newTokenId, msg.sender, chainNamespace, chainId);
//     }

//     function buyNFT(uint256 _tokenId) external payable {
//         NFTData storage data = nftDetails[_tokenId];
//         require(data.isListed, "NFT not for sale");
//         require(msg.value >= data.price, "Insufficient payment");
//         require(msg.sender != ownerOf(_tokenId), "Already owner");

//         address seller = ownerOf(_tokenId);
//         _transfer(seller, msg.sender, _tokenId);
//         payable(seller).transfer(msg.value);

//         data.isListed = false;

//         (string memory chainNamespace, , ) = ueaFactory.getOriginForUEA(msg.sender);
//         emit NFTBought(_tokenId, msg.sender, msg.value, chainNamespace);
//     }

//     function tipCreator(uint256 _tokenId) external payable {
//         NFTData storage data = nftDetails[_tokenId];
//         require(msg.value > 0, "No tip sent");

//         data.totalTips += msg.value;
//         payable(data.creator).transfer(msg.value);

//         (string memory chainNamespace, , ) = ueaFactory.getOriginForUEA(msg.sender);
//         emit TipSent(data.creator, msg.sender, msg.value, chainNamespace);
//     }

//     function listNFT(uint256 _tokenId, uint256 _price) external {
//         require(ownerOf(_tokenId) == msg.sender, "Not owner");
//         NFTData storage data = nftDetails[_tokenId];
//         data.price = _price;
//         data.isListed = true;
//     }

//     function getNFTDetails(uint256 _tokenId) external view returns (NFTData memory) {
//         return nftDetails[_tokenId];
//     }
// }
