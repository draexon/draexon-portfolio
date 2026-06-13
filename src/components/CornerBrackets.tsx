/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

export const CornerBrackets: React.FC = () => (
  <>
    <div className="absolute top-0 left-0 w-3 h-[1px] bg-saffron/50 group-hover:w-full transition-all duration-500" />
    <div className="absolute top-0 left-0 h-3 w-[1px] bg-saffron/50 group-hover:h-full transition-all duration-500" />
    <div className="absolute top-0 right-0 w-3 h-[1px] bg-saffron/50 group-hover:w-full transition-all duration-500" />
    <div className="absolute top-0 right-0 h-3 w-[1px] bg-saffron/50 group-hover:h-full transition-all duration-500" />
    <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-saffron/50 group-hover:w-full transition-all duration-500" />
    <div className="absolute bottom-0 left-0 h-3 w-[1px] bg-saffron/50 group-hover:h-full transition-all duration-500" />
    <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-saffron/50 group-hover:w-full transition-all duration-500" />
    <div className="absolute bottom-0 right-0 h-3 w-[1px] bg-saffron/50 group-hover:h-full transition-all duration-500" />
  </>
);
