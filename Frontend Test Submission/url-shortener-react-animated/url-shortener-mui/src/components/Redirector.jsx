import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { urlDatabase } from "../data/urls";
import logger from "../middleware/logger";
import { Typography, Container } from "@mui/material";

const Redirector = () => {
  const { shortcode } = useParams();
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    const entry = urlDatabase.get(shortcode);
    if (entry) {
      if (Date.now() < entry.expiry) {
        logger(`Redirecting using shortcode '${shortcode}' to '${entry.url}'`);
        setRedirectUrl(entry.url);
      } else {
        logger(`Shortcode '${shortcode}' expired.`);
      }
    } else {
      logger(`Shortcode '${shortcode}' not found.`);
    }
  }, [shortcode]);

  return redirectUrl ? (
    <Navigate to={redirectUrl} />
  ) : (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h5" color="error" align="center">
        Invalid or expired link
      </Typography>
    </Container>
  );
};

export default Redirector;