import { render } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

it("LoadingSpinner component rendering", () => {
  const { container } = render(<LoadingSpinner />);
  expect(container).toBeInTheDocument();
});
