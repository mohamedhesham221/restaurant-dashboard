import * as React from 'react';
import { Container, Stack } from '@mui/material';
import Sells from './Sells';
import TotalBalance from './TotalBalance';
import CustomersCount from './CustomersCount';
import BestMeals from './BestMeals';
import Statistics from './Statistics';
const Overview = () => {
  return (
    <>
    <Container maxWidth="lg" sx={{padding: "2rem"}}>
      <Stack direction={{xs: 'column',}} spacing={4}>
        <Stack direction={{xs: 'column',md: "row"}} gap={1} justifyContent="space-between" alignItems="center" flexWrap="wrap">
          <Statistics />
        </Stack>
        <Stack direction={{xs: 'column', lg: 'row'}} spacing={2} justifyContent="space-between" flexWrap="wrap">
          <Sells />
          <BestMeals />
        </Stack>
      </Stack>
      </Container>
    </>
  );
};

export default Overview;