import { MutableRefObject, useEffect } from "react";

export const useInfiniteScroll = (
    container: MutableRefObject<Element>,
    lastItem: MutableRefObject<Element>,
    hasMore: boolean,
    fetcher: () => void
): void => {
    useEffect(() => {
        if (!container.current || !lastItem.current) {
            return;
        }
        const options: IntersectionObserverInit = {
            root: container.current,
            threshold: 0.1
        };
        const observer = new IntersectionObserver(entries => {
            if (entries[ 0 ].isIntersecting && hasMore) {
                fetcher();
            }
        }, options);

        observer.observe(lastItem.current);

        return () => {
            lastItem.current && observer.unobserve(lastItem.current);
        };
    }, [ container, lastItem, hasMore ]);
};
