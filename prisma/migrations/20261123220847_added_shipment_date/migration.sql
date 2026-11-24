-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "shipment_date" DATE;

-- CreateIndex
CREATE INDEX "orders_shipment_date_idx" ON "orders"("shipment_date");
