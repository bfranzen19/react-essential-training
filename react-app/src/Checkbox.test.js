import {fireEvent, render} from "@testing-library/react";
import {Checkbox} from "./Checkbox";

test("selecting checkbox should change value to true", () => {
    const {getByLabelText} = render(<Checkbox />);
    const checkbox = getByLabelText(/not checked/i); // regex is not case sensitive
    fireEvent.click(checkbox); // automates the process of firing an event on the checkbox

    expect(checkbox.checked).toEqual(true);
});
