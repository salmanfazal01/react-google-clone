import React, { useState } from "react";
import "./Searchbar.css";
import { useHistory } from "react-router-dom";

import { Search as SearchIcon, Mic } from "@material-ui/icons";
import { Button } from "@material-ui/core";

const Searchbar = ({ hideButtons = false }) => {
  const [input, setInput] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const history = useHistory();

  const search = (e) => {
    e.preventDefault();
    history.push("/search");
  };

  return (
    <form className="search">
      <div
        className={`search_input ${inputFocus ? "search_input_focus" : null}`}
      >
        <SearchIcon className="search_inputSearchIcon" />
        <input
          onFocus={() => setInputFocus(true)}
          onMouseOver={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          onMouseOut={() => setInputFocus(false)}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Mic className="search_inputMicIcon" />
      </div>

      <div className="search_buttons">
        <Button
          className={hideButtons ? "search_buttonsHidden" : null}
          type="submit"
          variant="outlined"
          onClick={search}
        >
          Google Search
        </Button>
        <Button
          className={hideButtons ? "search_buttonsHidden" : null}
          variant="outlined"
        >
          I'm Feeling Lucky
        </Button>
      </div>
    </form>
  );
};

export default Searchbar;
