import React, { useState } from "react";
import { generateShortcode } from "../utils/generator";
import { urlDatabase } from "../data/urls";
import logger from "../middleware/logger";
import {
  Container, TextField, Button, Typography, Paper, Stack, Link
} from "@mui/material";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [validity, setValidity] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let code = customCode.trim() || generateShortcode();
    if (urlDatabase.has(code)) {
      alert("Shortcode already in use. Try a different one.");
      return;
    }
    const expiry = Date.now() + (parseInt(validity || 30) * 60000);
    urlDatabase.set(code, { url, expiry });
    logger(`Created shortcode '${code}' for URL '${url}' with expiry ${new Date(expiry)}`);
    setResult(`${window.location.origin}/${code}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }} className="fade-in">
        <Typography variant="h4" gutterBottom>
          ✨ URL Shortener
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Enter long URL"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
            />
            <TextField
              label="Custom shortcode (optional)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              fullWidth
            />
            <TextField
              label="Validity in minutes (default 30)"
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit">
              Shorten URL
            </Button>
            {result && (
              <Typography variant="body1">
                Shortened URL:&nbsp;
                <Link href={result} target="_blank" rel="noopener noreferrer">{result}</Link>
              </Typography>
            )}
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default UrlForm;