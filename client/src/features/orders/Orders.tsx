import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Order } from "../../app/models/order";
import { currencyFormat } from "../../app/util/util";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/basket";

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [subtotal, setSubtotal] = useState(0);

  // items = {order.orderItems as BasketItem[]}

  useEffect(() => {
    setLoading(true);
    agent.Orders.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = (orderId: number) => {
    const order = orders?.find((o) => o.id === orderId);
    if (order) {
      const newSubtotal =
        order.orderItems.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        ) ?? 0;
      setSubtotal(newSubtotal);
      setSelectedOrder(order);
      setShowOrderDetails(true);
    }
  };

  if (loading) return <LoadingComponents message="Loading orders..." />;

  return !showOrderDetails ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Data</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">
                {order.orderDate.split("T")[0]}
              </TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
                <Button onClick={() => handleClick(order.id)}>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Order summary for {selectedOrder?.id} - {selectedOrder?.orderStatus}
        </Typography>
        <Button onClick={() => setShowOrderDetails(false)} variant="contained">
          Back To My Orders
        </Button>
      </Box>

      <BasketTable
        items={selectedOrder?.orderItems as BasketItem[]}
        isBasket={false}
      />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
}
