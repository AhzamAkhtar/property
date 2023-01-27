import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
const SellerLogin = () => {
  return (
    <>
      <MDBContainer className="my-5">
        <MDBCard style={{ backgroundColor: "black" }}>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="/orange.jpg"
                alt="login form"
                className="rounded-start w-100"
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="mt-2 d-flex flex-row-reverse">
                  <span
                    className="h4  mb-0"
                    style={{ color: "white", fontSize: "3rem" }}
                  >
                    Create Your Seller Account....
                  </span>
                </div>

                <MDBInput
                  wrapperClass="mb-1"
                  id="formControlLg"
                  type="email"
                  placeholder="Enter Your Name"
                  size="lg"
                  style={{
                    marginTop: "5rem",
                    color: "white",
                    borderRadius: "20px",
                  }}
                />
                <label style={{ color: "white" }}>Name</label>
                <MDBInput
                  wrapperClass="mb-2"
                  id="formControlLg"
                  type="password"
                  placeholder="Enter Your Profile Url"
                  size="lg"
                  style={{ marginTop: "10px", borderRadius: "20px" }}
                />
                <label style={{ color: "white" }}>Profile Url</label>

                <MDBBtn
                  className="mb-4 px-5 btn btn-light"
                  size="lg"
                  style={{ borderRadius: "50px", marginTop: "50px" }}
                >
                  Login
                </MDBBtn>
                <div className="d-flex flex-row justify-content-start">
                  <a href="#!" className="small text-muted me-1">
                    Terms of use.
                  </a>
                  <a href="#!" className="small text-muted">
                    Privacy policy
                  </a>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </>
  );
};
export default SellerLogin;
