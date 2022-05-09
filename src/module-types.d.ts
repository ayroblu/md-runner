declare module "rehype-shiki" {
  export default function rehypeShiki(
    options?: Options | undefined | void,
  ):
    | import("unified").Transformer<import("hast").Root, import("hast").Root>
    | void;
  export type Root = import("hast").Root;
  export type Child = Root["children"][number];
  export type Element = import("hast").Element;
  export type Node = Child | Root;
  /**
   * Configuration.
   */
  export type Options = {
    theme?: string;
    useBackground?: boolean;
  };
}
declare module "@mapbox/rehype-prism" {
  export default function rehypePrism(
    options?: Options | undefined | void,
  ):
    | import("unified").Transformer<import("hast").Root, import("hast").Root>
    | void;
  export type Root = import("hast").Root;
  export type Child = Root["children"][number];
  export type Element = import("hast").Element;
  export type Node = Child | Root;
  /**
   * Configuration.
   */
  export type Options = {
    ignoreMissing?: boolean;
    alias?: { [k: string]: string[] | string };
  };
}
