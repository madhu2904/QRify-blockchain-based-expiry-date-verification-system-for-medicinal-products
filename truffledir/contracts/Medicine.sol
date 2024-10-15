// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Medicine {
    struct Product {
        string productName;
        string manufacturingDate;
        string expiryDate;
        string formulations;
    }

    mapping(bytes32 => Product) public products;

    // Event to notify product registration
    event ProductRegistered(
        bytes32 indexed productHash,
        string productName,
        string manufacturingDate,
        string expiryDate,
        string formulations
    );

    function registerProduct(
        string memory productName,
        string memory manufacturingDate,
        string memory expiryDate,
        string memory formulations
    ) public returns(bytes32) {
        // Ensure that product details are not empty
        require(bytes(productName).length > 0, "Product name is required");
        require(bytes(manufacturingDate).length > 0, "Manufacturing date is required");
        require(bytes(expiryDate).length > 0, "Expiry date is required");
        require(bytes(formulations).length > 0, "Formulations are required");

        // Generate a unique hash for the product
        bytes32 productHash = keccak256(abi.encodePacked(productName, manufacturingDate, expiryDate, formulations));
        
        // Store the product data in the mapping
        products[productHash] = Product(productName, manufacturingDate, expiryDate, formulations);

        // Emit event for product registration
        emit ProductRegistered(productHash, productName, manufacturingDate, expiryDate, formulations);
        return productHash;
    }

    // Function to retrieve product data
    function getProduct(bytes32 productHash) public view returns (
        string memory productName,
        string memory manufacturingDate,
        string memory expiryDate,
        string memory formulations
    ) {
        Product memory product = products[productHash];
        require(bytes(product.productName).length > 0, "Product does not exist");
        return (
            product.productName,
            product.manufacturingDate,
            product.expiryDate,
            product.formulations
        );
    }
}
