import { useEffect, useState } from "react";

/**
 * UI element sizes hook args types.
 */
export interface UIElementSizesHookArgsInterface {
    /**
     * Height of footer.
     */
    footerHeight: number;
    /**
     * Height of header.
     */
    headerHeight: number;
    /**
     * Heigh of the top loader bar.
     */
    topLoadingBarHeight: number;
}

/**
 * UI element sizes hook return value types.
 */
export interface UIElementSizesHookReturnValuesInterface {
    /**
     * Height of footer.
     */
    footerHeight: number;
    /**
     * Height of header.
     */
    headerHeight: number;
}

/**
 * Hook to get specifics ui elements sizes.
 *
 * @param props - Default values for the header and footer.
 * @returns App Header Height & Footer Height.
 */
export const useUIElementSizes = (props: UIElementSizesHookArgsInterface): UIElementSizesHookReturnValuesInterface => {

    const {
        footerHeight: _footerHeight,
        headerHeight: _headerHeight,
        topLoadingBarHeight
    } = props;

    const [ headerHeight, setHeaderHeight ] = useState<number>(_headerHeight);
    const [ footerHeight, setFooterHeight ] = useState<number>(_footerHeight);

    const appHeader = document.getElementById("app-header");
    const appFooter = document.getElementById("app-footer");

    useEffect(() => {
        if (headerHeight === appHeader?.offsetHeight) {
            return;
        }
        setHeaderHeight(appHeader?.offsetHeight - topLoadingBarHeight);
    });

    useEffect(() => {
        if (footerHeight === appFooter?.offsetHeight) {
            return;
        }
        setFooterHeight(appFooter?.offsetHeight);
    });

    return {
        headerHeight,
        // eslint-disable-next-line sort-keys
        footerHeight
    };
};
