import {
  MDBBadge,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBInput,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import CardList from "./CardList";
import { useEffect, useState } from "react";
import useAxios from "../Auth/AuthAxios";
import { useLoaderData, useSearchParams } from "react-router-dom";

function CardWrapper({ title }) {
  const [sort, setSort] = useState("ratings");
  const [searchval, setSearchVal] = useState("");
  const [searchMode, setSearchMode] = useState("title");
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryList, setQueryList] = useState(() => {
    const entries = searchParams.entries();
    return Array.from(entries, ([query, value]) => `${query}:${value}`);
  });
  const [dummy, setDummy] = useState(false);
  const defaultcardlist = useLoaderData();
  // const [cardlist, setCardlist] = useState(defaultcardlist);
  const api = useAxios();

  const handleSubmit = (e) => {
    setQueryList([...queryList, `${searchMode}:${searchval}`]);
  };
  const handleRemoveQuery = (index) => {
    setQueryList(queryList.filter((_, i) => i !== index)); // Removes the query at the specified index
  };
  

  useEffect(() => {
    let newParams = queryList.reduce((acc, querystring) => {
      const [key, val] = querystring.split(":");
      acc.push([key, val]);
      return acc;
    }, []);
    setSearchParams(newParams);
  }, [queryList, sort]);

  return (
    <MDBContainer
      fluid
      className="d-flex justify-content-center mt-5"
      style={{ minWidth: "500px" }}
    >
      <MDBContainer className="square border rounded mw-75">
        <h1 className="text-center m-4"> {title} </h1>
        <MDBRow>
          <MDBCol className="p-3" size="12" lg="6" xl="4" xxl="3">
            <MDBCard style={{}}>
              <MDBCardBody>
                <MDBCardTitle>Time range</MDBCardTitle>
                <hr></hr>
                <MDBCardText>
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="less then 10 mins"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="less than 30 mins"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="less than 60 mins"
                    
                  />
                </MDBCardText>
                <MDBCardTitle>Diets</MDBCardTitle>
                <hr></hr>
                <MDBCardText>
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Halal"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Vegan"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Keto"
                    
                  />
                </MDBCardText>
                <MDBCardTitle>Cuisines</MDBCardTitle>
                <hr></hr>
                <MDBCardText>
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Italian"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Middle Eastern"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Indian"
                    
                  />
                </MDBCardText>
                <MDBCardTitle>Ratings</MDBCardTitle>
                <hr></hr>
                <MDBCardText>
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="1"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="2"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="3"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="4"
                    
                  />
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="5"
                    
                  />
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol size="12" lg="6" xl="8" xxl="9">
            <MDBRow between className="text-center p-3 align-items-center">
              <MDBCol size="10">
                <MDBInputGroup>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => {
                      setSearchVal(e.currentTarget.value);
                    }}
                  />
                  <MDBBtn
                    outline
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Search {searchMode}
                  </MDBBtn>

                  <MDBDropdown>
                    <MDBDropdownToggle
                      outline
                      className="dropdown-toggle-split h-100"
                    >
                      <span className="visually-hidden">Toggle Dropdown</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem
                        link
                        aria-current={searchMode === "title"}
                        className={searchMode === "title" ? "active" : ""}
                        onClick={() => {
                          setSearchMode("title");
                        }}
                      >
                        Title
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        aria-current={searchMode === "ingredient"}
                        className={searchMode === "ingredient" ? "active" : ""}
                        onClick={() => {
                          setSearchMode("ingredient");
                        }}
                      >
                        Ingredient
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        link
                        aria-current={searchMode === "owner"}
                        className={searchMode === "owner" ? "active" : ""}
                        onClick={() => {
                          setSearchMode("owner");
                        }}
                      >
                        Owner
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBInputGroup>
              </MDBCol>
              <MDBCol size="2 p-0">
                <MDBDropdown>
                  <MDBDropdownToggle
                    style={{ paddingRight: "10px", paddingLeft: "10px" }}
                  >
                    Sort By
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem
                      link
                      aria-current={sort === "ratings"}
                      className={sort === "ratings" ? "active" : ""}
                      onClick={() => {
                        setSort("ratings");
                      }}
                    >
                      Ratings
                    </MDBDropdownItem>
                    <MDBDropdownItem
                      link
                      aria-current={sort === "favorites"}
                      className={sort === "favorites" ? "active" : ""}
                      onClick={() => {
                        setSort("favorites");
                      }}
                    >
                      Favorites
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBCol>
            </MDBRow>
            <MDBRow className="gy-2">
  {queryList.length
    ? queryList.map((query, index) => {
        return (
          <MDBBadge
            key={index}
            pill
            className="mx-2 flex items-center justify-between"
            light
            style={{ width: "auto" }}
          >
            {query}
            <span
              className="ml-2 cursor-pointer text-red-500"
              onClick={() => handleRemoveQuery(index)}
            >
              &times; {/* This is the "×" symbol for the close icon */}
            </span>
          </MDBBadge>
        );
      })
    : null}
</MDBRow>

            <MDBRow center className="p-3">
              <CardList col_size={3} sort={sort} list={defaultcardlist} />
            </MDBRow>
            <MDBRow center className="p-3">
              Pagination
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBContainer>
  );
}

export default CardWrapper;
