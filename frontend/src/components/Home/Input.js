import { Box, Typography } from '@material-ui/core';
import React, { useState, useEffect} from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  suggestions: {
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
      backgroundColor: '#C9CACC'
    }
  },
}));

function Input({classes, label, search, setQuery}) {
      const cls = useStyles()
      const [text, setText] = useState('');
      const [title, setTitle] = useState(false);
      const [loc, setLoc] = useState(false);
      const [suggestions, setSuggestions] = useState([]);
      const allJobs = useSelector(state => state.jobs.allJobs);
      const handleText = (e) => {
        setText(e.target.value);
        let matches = [];
        if ((e.target.value).length > 0) {
          matches = allJobs.filter(job => {
            const regex = new RegExp(`${e.target.value}`, "gi");
            if (job.jobLocation.city.match(regex)) {
              console.log("loc");
              setLoc(true);
              return job.jobLocation.city.match(regex);
            } else {
              console.log("title");
              setTitle(true);
              return job.jobTitle.match(regex)
            }
          })
        }
        setSuggestions(matches);
      }

      const handleSelect = (item) => {
        setTitle(false);
        setLoc(false);
        setText(item);
        setSuggestions([]);
      }

    return (
        <Box className={classes.suggestionInput}>
            <Typography variant='h5'>
                {label}
                </Typography>
          <div className={classes.autoComplete}>
          <OutlinedInput type="text" onChange={handleText} value={text} className={classes.input} 
                placeholder={search} onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([])
                  }, 100)
                }} />
            {
            suggestions.length !== 0 && suggestions.map((suggestion, index) =>
              <div key={index} className={cls.suggestions} onClick={() => handleSelect(suggestion.jobTitle)}>
                    {title && suggestion.jobTitle}
                    {loc && suggestion.jobLocation.city}
                    </div>
            )}
          </div>
         </Box>
    );
}

export default Input;