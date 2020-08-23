import React from "react";

//import "./SearchPage2.css";
import "./SearchPage.css";
import { useStateValue } from "../../contextApi/StateProvider";
import UseGoogleSearch from "../../config/useGoogleSearch";
import devResponse from "../../config/DUMMY_RESPONSE";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";
import {
  Search as SearchIcon,
  DescriptionOutlined,
  ImageOutlined,
  LocalOfferOutlined,
  RoomOutlined,
  MoreVert,
} from "@material-ui/icons";
import { Grid, Hidden, Typography } from "@material-ui/core";

const SearchPage = () => {
  const [{ term = "" }, dispatch] = useStateValue();

  //LIVE API CALL
  const { data } = UseGoogleSearch(term);

  //DUMMY RESPONSE
  //const data = devResponse;

  console.log(data);
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Grid container className="searchPage_header">
            <Grid item>
              <Link to="/">
                <img
                  className="searchPage_headerLogo"
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                  alt="Logo"
                />
              </Link>
            </Grid>

            <Grid item>
              <Searchbar hideButtons inputValue={term} />
              <Grid container className="searchPage_headerButtons">
                <Grid item className="searchPage_headerButtonsLeft">
                  <div className="searchPage_headerButton active">
                    <SearchIcon fontSize="small" />
                    <Link to="/all">All</Link>
                  </div>
                  <Hidden xsDown>
                    <div className="searchPage_headerButton">
                      <ImageOutlined fontSize="small" />
                      <Link to="/images">Images</Link>
                    </div>
                    <div className="searchPage_headerButton">
                      <DescriptionOutlined fontSize="small" />
                      <Link to="/news">News</Link>
                    </div>
                    <div className="searchPage_headerButton">
                      <LocalOfferOutlined fontSize="small" />
                      <Link to="/shopping">Shopping</Link>
                    </div>
                    <Hidden smDown>
                      <div className="searchPage_headerButton">
                        <RoomOutlined fontSize="small" />
                        <Link to="/maps">Maps</Link>
                      </div>
                    </Hidden>
                  </Hidden>

                  <div className="searchPage_headerButton">
                    <MoreVert fontSize="small" />
                    <Link to="/more">More</Link>
                  </div>
                </Grid>
                <Grid item className="searchPage_headerButtonsRight">
                  <div className="searchPage_headerButton">
                    <Link to="/settings">Settings</Link>
                  </div>
                  <div className="searchPage_headerButton">
                    <Link to="/tools">Tools</Link>
                  </div>
                </Grid>
              </Grid>

              {term && (
                <Grid item className="searchPage_results">
                  <Typography className="searchPage_resultCount">
                    About {data?.searchInformation.formattedTotalResults}{" "}
                    results ({data?.searchInformation.formattedSearchTime}{" "}
                    seconds)
                  </Typography>

                  {data?.items.map((item) => (
                    <div className="searchPage_result">
                      <Typography variant="body2">
                        <a href={item.link} className="searchPage_displayLink">
                          {item.pagemap?.cse_image?.length > 0 &&
                            item.pagemap?.cse_image[0]?.src && (
                              <img
                                className="searchPage_resultImage"
                                src={item.pagemap?.cse_image[0]?.src}
                                alt=""
                              />
                            )}
                          {item.displayLink}
                        </a>
                      </Typography>

                      <Typography variant="h6">
                        <a className="searchPage_resultTitle" href={item.link}>
                          {item.title}
                        </a>
                      </Typography>

                      <Typography
                        variant="body2"
                        className="searchPage_resultSnippet"
                      >
                        {item.snippet}
                      </Typography>
                    </div>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPage;
