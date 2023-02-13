import {render} from "@testing-library/react";
import {Star} from "./star";

test("renders an h1", () => {
    const {getByText} = render(<Star />); // selects the render of the star
    const h1 = getByText(/cool star/); // use getByText to look for the text

    expect(h1).toHaveTextContent("cool star");
});
