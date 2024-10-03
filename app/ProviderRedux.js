"use client";

import { store } from "@/redux_query/store";
import { Provider } from "react-redux";

function ProviderRedux({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ProviderRedux;
