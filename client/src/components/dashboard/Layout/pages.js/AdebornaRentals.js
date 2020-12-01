import React from 'react';
import '../../../../App.css';
import Cards from '../Cards';
import Search from "../Search/search";
import Footer from '../Footer';
import Logout from "../../Layout/Logout";

function AdebornaRentals() {
  return (
    <>
      <Search
        options={[
          "Clark St_Abington",
          "Arborway Way",
          "Broadway St",
          "High st",
          "Florence",
          "Haverhill st",
          "Fountain St",
          "Pleasant St",
          "Candy St",
          "Braintree",
          "Center St_Lowell",
        ]}
      />
      <Logout />
      <Cards />
      <Footer />
    </>
  );
}

export default AdebornaRentals;