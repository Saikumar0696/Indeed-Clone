import { Box } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";

function Input({ classes, setValue, value, options, setError,switchJobSearch }) {
  return (
    <Box className={classes.suggestionInput}>
      <OutlinedInput
        className={classes.input}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          switchJobSearch();
        }}
      />
    </Box>
  );
}

export default Input;
