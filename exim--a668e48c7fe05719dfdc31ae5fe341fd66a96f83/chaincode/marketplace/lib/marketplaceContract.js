'use strict';

const { Contract } = require('fabric-contract-api');

class MarketplaceContract extends Contract {

    async CreateUser(ctx, userID, userName, userEmail, userRole, userOrg, hashedPassword) {
        const findUser = await this.IsUserExist(ctx, userID);
        if (findUser) {
            throw new Error(`User ${userID} already exist`);
        }
        const user = {
            UserID: userID,
            UserName: userName,
            UserEmail: userEmail,
            UserRole: userRole,
            UserOrg: userOrg,
            // UserStatus: "Inactive"
            HashedPassword: hashedPassword
        };

        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
        return JSON.stringify(user);
    }

    async IsUserExist(ctx, userID) {
        const user = await ctx.stub.getState(userID);
        return user && user.length > 0;
    }

    async ChangeUserStatus(ctx, userID, userStatus) {
        const findUser = await this.IsUserExist(ctx, userID);
        if (!findUser) {
            throw new Error(`User ${userID} does not exist`);
        }
        const user = await this.readUser(ctx, userID);
        user.UserStatus = userStatus;
        await ctx.stub.putState(userID, Buffer.from(JSON.stringify(user)));
        return JSON.stringify(user);
    }

    async readUser(ctx, userID) {
        const userJSON = await ctx.stub.getState(userID);
        if (!userJSON || userJSON.length === 0) {
            throw new Error(`User ${userID} does not exist`);
        }
        return JSON.parse(userJSON.toString());
    }

    async CreateProduct(ctx, productID, productType, productQuantity, price, productionDate, exporterID, intendedBusinessID) {
        const findProduct = await this.IsProductExist(ctx, productID);
        if (findProduct) {
            throw new Error(`Product ${productID} already exist`);
        }
        const findExporter = await this.IsUserExist(ctx, exporterID);
        if (!findExporter) {
            throw new Error(`Exporter ${exporterID} does not exist`);
        }
        const product = {
            ProductID: productID,
            ProductType: productType,
            ProductQuantity: productQuantity,
            Price: price,
            ProductionDate: productionDate,
            ExporterID: exporterID,
            IntendedBusinessID: intendedBusinessID,
            ImporterID: "Created",
            Status: "Created",
            newNumberOfPackages: "-----"
        };

        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async IsProductExist(ctx, productID) {
        const product = await ctx.stub.getState(productID);
        return product && product.length > 0;
    }

    async changeProductStatus(ctx, productID, status, NewNumberOfPackages, ProductQuantity) {
        console.log(productID)
        const findProduct = await this.IsProductExist(ctx, productID);
        if (!findProduct) {
            throw new Error(`Product ${productID} does not exist`);
        }
        const product = await this.readProduct(ctx, productID);
        product.Status = status;
        product.newNumberOfPackages = NewNumberOfPackages;
        product.ProductQuantity = ProductQuantity;
        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
        
    }

    async readProduct(ctx, productID) {
        const productJSON = await ctx.stub.getState(productID);
        if (!productJSON || productJSON.length === 0) {
            throw new Error(`Product ${productID} does not exist`);
        }
        return JSON.parse(productJSON.toString());
    }

    async UpdateProductImporterID(ctx, productID, importerID) {
        const findProduct = await this.IsProductExist(ctx, productID);
        if (!findProduct) {
            throw new Error(`Product ${productID} does not exist`);
        }
        const findImporter = await this.IsUserExist(ctx, importerID);
        if (!findImporter) {
            throw new Error(`Importer ${importerID} does not exist`);
        }
        const product = await this.readProduct(ctx, productID);
        product.ImporterID = importerID;
        await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
        return JSON.stringify(product);
    }

    async CreateDeliveryDetails(ctx, deliveryID, productID) {
        const findDelivery = await this.IsDeliveryExist(ctx, deliveryID);
        if (findDelivery) {
            throw new Error(`Delivery ${deliveryID} already exist`);33
        }
        const findProduct = await this.IsProductExist(ctx, productID);
        if (!findProduct) {
            throw new Error(`Product ${productID} does not exist`);
        }
        const delivery = {
            DeliveryID: deliveryID,
            TransportationMode: "NA",
            ShipmentDate: "NA",
            DeliveryDate: "NA",
            CurrentLocation: "Exporter",
            ProductID: productID,
            Status: "Delivery Req created"
        };

        await ctx.stub.putState(deliveryID, Buffer.from(JSON.stringify(delivery)));
        return JSON.stringify(delivery);
    }

    async IsDeliveryExist(ctx, deliveryID) {
        const delivery = await ctx.stub.getState(deliveryID);
        return delivery && delivery.length > 0;
    }

    async readDelivery(ctx, deliveryID) {
        const deliveryJSON = await ctx.stub.getState(deliveryID);
        if (!deliveryJSON || deliveryJSON.length === 0) {
            throw new Error(`Delivery ${deliveryID} does not exist`);
        }
        return JSON.parse(deliveryJSON.toString());
    }

    async ChangeDeliveryStatus(ctx, deliveryID, status) {
        const findDelivery = await this.IsDeliveryExist(ctx, deliveryID);
        if (!findDelivery) {
            throw new Error(`Delivery ${deliveryID} does not exist`);
        }
        const delivery = await this.readDelivery(ctx, deliveryID);
        delivery.Status = status;
        await ctx.stub.putState(deliveryID, Buffer.from(JSON.stringify(delivery)));
        return JSON.stringify(delivery);
    }

    async UpdateTransportationMode(ctx, deliveryID, transportationMode) {
        const findDelivery = await this.IsDeliveryExist(ctx, deliveryID);
        if (!findDelivery) {
            throw new Error(`Delivery ${deliveryID} does not exist`);
        }
        const delivery = await this.readDelivery(ctx, deliveryID);
        delivery.TransportationMode = transportationMode;
        await ctx.stub.putState(deliveryID, Buffer.from(JSON.stringify(delivery)));
        return JSON.stringify(delivery);
    }

    async UpdateShipmentDate(ctx, deliveryID, shipmentDate) {
        const findDelivery = await this.IsDeliveryExist(ctx, deliveryID);
        if (!findDelivery) {
            throw new Error(`Delivery ${deliveryID} does not exist`);
        }
        const delivery = await this.readDelivery(ctx, deliveryID);
        delivery.ShipmentDate = shipmentDate;
        await ctx.stub.putState(deliveryID, Buffer.from(JSON.stringify(delivery)));
        return JSON.stringify(delivery);
    }

    async UpdateDeliveryDate(ctx, deliveryID, deliveryDate) {
        const findDelivery = await this.IsDeliveryExist(ctx, deliveryID);
        if (!findDelivery) {
            throw new Error(`Delivery ${deliveryID} does not exist`);
        }
        const delivery = await this.readDelivery(ctx, deliveryID);
        delivery.DeliveryDate = deliveryDate;
        await ctx.stub.putState(deliveryID, Buffer.from(JSON.stringify(delivery)));
        return JSON.stringify(delivery);
    }

    async UpdateCurrentLocation(ctx, deliveryID, currentLocation) {
        const findDelivery = await this.IsDeliveryExist(ctx, deliveryID);
        if (!findDelivery) {
            throw new Error(`Delivery ${deliveryID} does not exist`);
        }
        const delivery = await this.readDelivery(ctx, deliveryID);
        delivery.CurrentLocation = currentLocation;
        await ctx.stub.putState(deliveryID, Buffer.from(JSON.stringify(delivery)));
        return JSON.stringify(delivery);
    }

    async CreateCertificate(ctx, certificateID, ownerName, plotRegNo, inspectionReportNumber, dateOfInspection, verification_of_spray_records) {
        const findCertificate = await this.IsCertificateExist(ctx, certificateID);
        if (findCertificate) {
            throw new Error(`Certificate ${certificateID} already exist`);
        }
        const certificate = {
            CertificateID: certificateID,
            OwnerName: ownerName,
            PlotRegNo: plotRegNo,
            InspectionReportNumber: inspectionReportNumber,
            DateOfInspection: dateOfInspection,
            VerificationOfSprayRecords: verification_of_spray_records,
            Status: 'Certificate created'
        };

        await ctx.stub.putState(certificateID, Buffer.from(JSON.stringify(certificate)));
        return JSON.stringify(certificate);
    }   

    async UpdateCertificateStatus(ctx, certificateID, status) {
        const findCertificate = await this.IsCertificateExist(ctx, certificateID);
        if (!findCertificate) {
            throw new Error(`Certificate ${certificateID} does not exist`);
        }
        const certificate = await this.readCertificate(ctx, certificateID);
        certificate.Status = status;
        await ctx.stub.putState(certificateID, Buffer.from(JSON.stringify(certificate)));
        return JSON.stringify(certificate);
    }

    async IsCertificateExist(ctx, certificateID) {
        const certificateAsBytes = await ctx.stub.getState(certificateID);
        if (!certificateAsBytes || certificateAsBytes.length === 0) {
            return false;
        }
        return true;
    }

    async readCertificate(ctx, certificateID) {
        const certificateJSON = await ctx.stub.getState(certificateID);
        if (!certificateJSON || certificateJSON.length === 0) {
            throw new Error(`Certificate ${certificateID} does not exist`);
        }
        return JSON.parse(certificateJSON.toString());
    }

    async FillNumberOfPackages(ctx, productID, numberOfPackages) {
        const product = await this.readProduct(ctx, productID);
        // console.log(numberOfPackages, product.productQuantity, "upcomingvalues")
        // Check if there is enough stock
        if (product.ProductQuantity < numberOfPackages) {
            // Trigger notifications to the back of the chain
            // You may use events or external notification services here
            console.log(`Understock for product ${productID}. Notify the back of the chain.`);
        } else {
            // Proceed with the delivery
            // Update product details and delivery status
            product.ProductQuantity -= numberOfPackages;
            await ctx.stub.putState(productID, Buffer.from(JSON.stringify(product)));
    
            // Add any other relevant logic for the delivery process
        }
    }
    
    // It's a monitoring mechanism to proactively check for understock conditions and notify relevant parties if needed.
    async CheckStockAndNotify(ctx, productID) {
        // Add logic to check if there is understock
        // If understock, trigger notifications to the back of the chain
        // You can use events or external notification services for this

        // Check if the product with the given ID exists
        const productAsBytes = await ctx.stub.getState(productID);
        if (!productAsBytes || productAsBytes.length === 0) {
            throw new Error(`Product with ID ${productID} does not exist`);
        }

        // Retrieve the existing product data
        const product = JSON.parse(productAsBytes.toString());

        // Check stock status
        const currentStock = product.productQuantity;
        const notifyThreshold = 100; // Set your threshold as needed

        let stockStatus;
        let message;
        if (currentStock > notifyThreshold) {
            stockStatus = 'Overstock';
            message = `The remaining stock for product ${productID} is ${currentStock}.`;
        } else if (currentStock <= notifyThreshold && currentStock > 0) {
            stockStatus = 'Understock';
            message = `There is understock for product ${productID}! Produce more packages.`;
        } else {
            stockStatus = 'Out of stock';
            message = `Product ${productID} is out of stock.`;
        }
        return JSON.stringify({ stockStatus, message, currentStock });

    }
    
}

module.exports = MarketplaceContract;
