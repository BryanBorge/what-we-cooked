import { BrandingProvider } from "./Components/BrandingProvider/BrandingProvider";
import { ContentLayout } from "./Components/ContentLayout";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./Context/AuthContext";
import { ProvideMeals } from "./Context/MealContext";
import { ProvideGlobalContext } from "./Context/GlobalContext";

function App() {
  return (
    <ProvideGlobalContext>
      <ProvideAuth>
        <ProvideMeals>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <BrandingProvider>
              <BrowserRouter>
                <ContentLayout />
              </BrowserRouter>
            </BrandingProvider>
          </LocalizationProvider>
        </ProvideMeals>
      </ProvideAuth>
    </ProvideGlobalContext>
  );
}

export default App;
