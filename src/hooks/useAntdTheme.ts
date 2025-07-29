import { theme } from "antd";

export const useAntdTheme = () => {
    const {
        token: {
            colorBgContainer,
        }
    } = theme.useToken()
    const configTheme = {
        components: {
            Tabs: {
                horizontalMargin: '10px 0 0 0',
                cardBg: colorBgContainer,
            },
            List: {
                metaMarginBottom: 0,
                titleMarginBottom: '5px',
            },
        },
    }
    return {
        configTheme
    }
}
