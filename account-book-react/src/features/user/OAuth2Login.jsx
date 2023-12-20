import React from "react";
import { Button } from "@mui/material";
import oauth2s from "../../constants/oauth2";
import PropTypes from "prop-types";

const OAuth2Login = ({ fullWidth = false }) => {
  return (
    <>
      {oauth2s.map((oauth2, index) => (
        <Button
          fullWidth={fullWidth}
          key={index}
          variant="outlined"
          startIcon={<oauth2.icon />}
          href={oauth2.path}
        >
          {oauth2.title}
        </Button>
      ))}
    </>
  );
};

OAuth2Login.propTypes = {
  fullWidth: PropTypes.bool,
};

export default OAuth2Login;
