import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
} from "@coreui/react";
import Header from "@components/ui/Header/Header";
import "@styles/pages/Pricing.scss";

const PricingPage = () => {
  const pricingPlans = [
    {
      title: "Basic",
      price: "$9.99 / month",
      features: [
        "Up to 10 locations",
        "Basic location details",
        "Email support",
      ],
      buttonText: "Choose Basic",
      buttonLink: "/subscribe/basic",
      headerClass: "bg-light text-primary",
      cardClass: "shadow-sm",
    },
    {
      title: "Pro",
      price: "$29.99 / month",
      features: [
        "Up to 50 locations",
        "Detailed analytics",
        "Priority email support",
      ],
      buttonText: "Choose Pro",
      buttonLink: "/subscribe/pro",
      headerClass: "bg-primary text-white",
      cardClass: "shadow-lg",
    },
    {
      title: "Enterprise",
      price: "Contact Us",
      features: [
        "Unlimited locations",
        "Dedicated account manager",
        "24/7 support",
      ],
      buttonText: "Contact Us",
      buttonLink: "/contact",
      headerClass: "bg-light text-primary",
      cardClass: "shadow-sm",
    },
  ];

  return (
    <CContainer className="py-5">
      <Header />
      <CRow className="justify-content-center text-center">
        <CCol md="8">
          <h1 className="display-4 text-primary mb-3">Pricing Plans</h1>
          <p className="lead text-muted">
            Choose the plan that fits your needs and take your production
            management to the next level.
          </p>
        </CCol>
      </CRow>

      {/* Pricing Cards */}
      <CRow className="mt-5">
        {pricingPlans.map((plan, index) => (
          <CCol md="4" className="mb-4" key={index}>
            <CCard className={`rounded pricing-card ${plan.cardClass}`}>
              <CCardHeader className={`text-center ${plan.headerClass}`}>
                <h2 className="font-weight-bold">{plan.title}</h2>
                <p
                  className={
                    plan.headerClass.includes("text-white") ? "" : "text-muted"
                  }
                >
                  {plan.price}
                </p>
              </CCardHeader>
              <CCardBody>
                <ul className="list-unstyled text-center mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <div className="text-center">
                  <CButton color="primary" href={plan.buttonLink}>
                    {plan.buttonText}
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </CContainer>
  );
};

export default PricingPage;
