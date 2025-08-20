-- Initial Database Schema Migration
-- Restaurant Management Dashboard

-- Create enum types
CREATE TYPE "OrderStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'PREPARING',
  'READY',
  'DELIVERED',
  'CANCELLED',
  'REFUNDED'
);

CREATE TYPE "PaymentStatus" AS ENUM (
  'PENDING',
  'AUTHORIZED',
  'CAPTURED',
  'FAILED',
  'REFUNDED',
  'CANCELLED'
);

CREATE TYPE "PaymentMethod" AS ENUM (
  'CASH',
  'CREDIT_CARD',
  'DEBIT_CARD',
  'MOBILE_PAY',
  'GIFT_CARD',
  'OTHER'
);

CREATE TYPE "MenuItemStatus" AS ENUM (
  'ACTIVE',
  'INACTIVE',
  'OUT_OF_STOCK',
  'SEASONAL'
);

CREATE TYPE "TableStatus" AS ENUM (
  'AVAILABLE',
  'OCCUPIED',
  'RESERVED',
  'CLEANING',
  'MAINTENANCE'
);

CREATE TYPE "ReservationStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'SEATED',
  'COMPLETED',
  'CANCELLED',
  'NO_SHOW'
);

CREATE TYPE "StaffRole" AS ENUM (
  'OWNER',
  'MANAGER',
  'CHEF',
  'WAITER',
  'CASHIER',
  'BARTENDER',
  'HOST',
  'KITCHEN_STAFF'
);

CREATE TYPE "ModifierType" AS ENUM (
  'ADDITION',
  'SUBSTITUTION',
  'REMOVAL',
  'SPECIAL_REQUEST'
);

-- Create tables
CREATE TABLE "Restaurant" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "address" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "website" TEXT,
  "timezone" TEXT NOT NULL DEFAULT 'America/New_York',
  "currency" TEXT NOT NULL DEFAULT 'USD',
  "taxRate" DECIMAL(5,4) NOT NULL DEFAULT 0.08,
  "operatingHours" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "Restaurant_name_idx" ON "Restaurant"("name");

CREATE TABLE "Category" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "displayOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "imageUrl" TEXT,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Category_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "Category_restaurantId_idx" ON "Category"("restaurantId");
CREATE INDEX "Category_displayOrder_idx" ON "Category"("displayOrder");

CREATE TABLE "MenuItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT,
  "price" DECIMAL(10,2) NOT NULL,
  "compareAtPrice" DECIMAL(10,2),
  "cost" DECIMAL(10,2),
  "sku" TEXT UNIQUE,
  "imageUrl" TEXT,
  "status" "MenuItemStatus" NOT NULL DEFAULT 'ACTIVE',
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "nutritionalInfo" JSONB,
  "allergens" TEXT[],
  "categoryId" TEXT NOT NULL,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MenuItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id"),
  CONSTRAINT "MenuItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "MenuItem_restaurantId_idx" ON "MenuItem"("restaurantId");
CREATE INDEX "MenuItem_categoryId_idx" ON "MenuItem"("categoryId");
CREATE INDEX "MenuItem_status_idx" ON "MenuItem"("status");
CREATE INDEX "MenuItem_sku_idx" ON "MenuItem"("sku");

CREATE TABLE "Modifier" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "price" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "type" "ModifierType" NOT NULL,
  "required" BOOLEAN NOT NULL DEFAULT false,
  "maxQuantity" INTEGER NOT NULL DEFAULT 1,
  "menuItemId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Modifier_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE
);

CREATE INDEX "Modifier_menuItemId_idx" ON "Modifier"("menuItemId");

CREATE TABLE "Customer" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "phone" TEXT UNIQUE,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "preferences" JSONB,
  "loyaltyPoints" INTEGER NOT NULL DEFAULT 0,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Customer_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "Customer_email_idx" ON "Customer"("email");
CREATE INDEX "Customer_phone_idx" ON "Customer"("phone");
CREATE INDEX "Customer_restaurantId_idx" ON "Customer"("restaurantId");

CREATE TABLE "Table" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "number" TEXT NOT NULL,
  "capacity" INTEGER NOT NULL,
  "status" "TableStatus" NOT NULL DEFAULT 'AVAILABLE',
  "section" TEXT,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE,
  UNIQUE("restaurantId", "number")
);

CREATE INDEX "Table_restaurantId_idx" ON "Table"("restaurantId");
CREATE INDEX "Table_status_idx" ON "Table"("status");

CREATE TABLE "Order" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "orderNumber" TEXT NOT NULL UNIQUE,
  "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
  "type" TEXT NOT NULL,
  "subtotal" DECIMAL(10,2) NOT NULL,
  "tax" DECIMAL(10,2) NOT NULL,
  "tip" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
  "total" DECIMAL(10,2) NOT NULL,
  "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
  "paymentMethod" "PaymentMethod",
  "posOrderId" TEXT UNIQUE,
  "posPaymentId" TEXT,
  "customerId" TEXT,
  "tableId" TEXT,
  "restaurantId" TEXT NOT NULL,
  "orderedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "confirmedAt" TIMESTAMP(3),
  "preparedAt" TIMESTAMP(3),
  "deliveredAt" TIMESTAMP(3),
  "cancelledAt" TIMESTAMP(3),
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id"),
  CONSTRAINT "Order_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id"),
  CONSTRAINT "Order_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "Order_restaurantId_idx" ON "Order"("restaurantId");
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");
CREATE INDEX "Order_tableId_idx" ON "Order"("tableId");
CREATE INDEX "Order_status_idx" ON "Order"("status");
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");
CREATE INDEX "Order_posOrderId_idx" ON "Order"("posOrderId");
CREATE INDEX "Order_orderedAt_idx" ON "Order"("orderedAt");

CREATE TABLE "OrderItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "quantity" INTEGER NOT NULL,
  "price" DECIMAL(10,2) NOT NULL,
  "total" DECIMAL(10,2) NOT NULL,
  "notes" TEXT,
  "orderId" TEXT NOT NULL,
  "menuItemId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE,
  CONSTRAINT "OrderItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id")
);

CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");
CREATE INDEX "OrderItem_menuItemId_idx" ON "OrderItem"("menuItemId");

CREATE TABLE "OrderItemModifier" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "quantity" INTEGER NOT NULL DEFAULT 1,
  "price" DECIMAL(10,2) NOT NULL,
  "orderItemId" TEXT NOT NULL,
  "modifierId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OrderItemModifier_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE CASCADE,
  CONSTRAINT "OrderItemModifier_modifierId_fkey" FOREIGN KEY ("modifierId") REFERENCES "Modifier"("id")
);

CREATE INDEX "OrderItemModifier_orderItemId_idx" ON "OrderItemModifier"("orderItemId");
CREATE INDEX "OrderItemModifier_modifierId_idx" ON "OrderItemModifier"("modifierId");

CREATE TABLE "Reservation" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "confirmationCode" TEXT NOT NULL UNIQUE,
  "status" "ReservationStatus" NOT NULL DEFAULT 'PENDING',
  "partySize" INTEGER NOT NULL,
  "dateTime" TIMESTAMP(3) NOT NULL,
  "duration" INTEGER NOT NULL DEFAULT 90,
  "specialRequests" TEXT,
  "customerId" TEXT NOT NULL,
  "tableId" TEXT,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Reservation_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id"),
  CONSTRAINT "Reservation_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id"),
  CONSTRAINT "Reservation_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "Reservation_restaurantId_idx" ON "Reservation"("restaurantId");
CREATE INDEX "Reservation_customerId_idx" ON "Reservation"("customerId");
CREATE INDEX "Reservation_tableId_idx" ON "Reservation"("tableId");
CREATE INDEX "Reservation_dateTime_idx" ON "Reservation"("dateTime");
CREATE INDEX "Reservation_status_idx" ON "Reservation"("status");
CREATE INDEX "Reservation_confirmationCode_idx" ON "Reservation"("confirmationCode");

CREATE TABLE "Staff" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "phone" TEXT,
  "role" "StaffRole" NOT NULL,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "schedule" JSONB,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Staff_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "Staff_restaurantId_idx" ON "Staff"("restaurantId");
CREATE INDEX "Staff_email_idx" ON "Staff"("email");
CREATE INDEX "Staff_role_idx" ON "Staff"("role");

CREATE TABLE "InventoryItem" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "sku" TEXT NOT NULL UNIQUE,
  "quantity" DECIMAL(10,2) NOT NULL,
  "unit" TEXT NOT NULL,
  "minQuantity" DECIMAL(10,2) NOT NULL,
  "maxQuantity" DECIMAL(10,2),
  "cost" DECIMAL(10,2) NOT NULL,
  "supplier" TEXT,
  "menuItemId" TEXT,
  "restaurantId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InventoryItem_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id"),
  CONSTRAINT "InventoryItem_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE CASCADE
);

CREATE INDEX "InventoryItem_restaurantId_idx" ON "InventoryItem"("restaurantId");
CREATE INDEX "InventoryItem_menuItemId_idx" ON "InventoryItem"("menuItemId");
CREATE INDEX "InventoryItem_sku_idx" ON "InventoryItem"("sku");

CREATE TABLE "InventoryTransaction" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "type" TEXT NOT NULL,
  "quantity" DECIMAL(10,2) NOT NULL,
  "previousQty" DECIMAL(10,2) NOT NULL,
  "newQty" DECIMAL(10,2) NOT NULL,
  "cost" DECIMAL(10,2),
  "reason" TEXT,
  "inventoryItemId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InventoryTransaction_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem"("id") ON DELETE CASCADE
);

CREATE INDEX "InventoryTransaction_inventoryItemId_idx" ON "InventoryTransaction"("inventoryItemId");
CREATE INDEX "InventoryTransaction_type_idx" ON "InventoryTransaction"("type");
CREATE INDEX "InventoryTransaction_createdAt_idx" ON "InventoryTransaction"("createdAt");

-- Create update triggers for updatedAt columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_restaurant_updated_at BEFORE UPDATE ON "Restaurant" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_category_updated_at BEFORE UPDATE ON "Category" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_menuitem_updated_at BEFORE UPDATE ON "MenuItem" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_modifier_updated_at BEFORE UPDATE ON "Modifier" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customer_updated_at BEFORE UPDATE ON "Customer" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_table_updated_at BEFORE UPDATE ON "Table" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_order_updated_at BEFORE UPDATE ON "Order" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orderitem_updated_at BEFORE UPDATE ON "OrderItem" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reservation_updated_at BEFORE UPDATE ON "Reservation" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON "Staff" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inventoryitem_updated_at BEFORE UPDATE ON "InventoryItem" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();