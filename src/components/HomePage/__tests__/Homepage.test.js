import React  from "react";
import { render } from "@testing-library/react";
import { HomePage } from '../Homepage';
import { Provider } from "react-redux";
import store from "../../../redux-store/Store";

test('Homepage component should be created', () => {
    const { container } = render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(container).toBeDefined();
});




