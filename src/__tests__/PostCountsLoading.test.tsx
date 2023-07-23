import PostCountsLoading from "@/components/forum/RightSide/PostCountsLoading";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<PostCountsLoading />);

    const heading = screen.getByRole("heading", {
      name: /my issue progress/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
