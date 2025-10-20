import { Probot } from "probot";
/**
 * Logic chính của ProBot App.
 * Lắng nghe sự kiện 'issues.opened' và đăng bình luận chào mừng.
 */
declare const welcomeBot: (app: Probot) => void;
export default welcomeBot;
