import AppRoutes from "./routes/AppRoutes";
import { SavedFoodsProvider } from "./contexts/SavedFoodsContext";

const App = () => {
    return (
      <SavedFoodsProvider>
        <div>
          <AppRoutes/>
        </div>
      </SavedFoodsProvider>
    )
}


export default App;
