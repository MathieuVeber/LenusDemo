import { Provider } from "react-redux";

import AppLayout from "./AppLayout";
import { store } from "./utils/store";

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;
