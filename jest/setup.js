import fs from 'fs';
import path from 'path';
import 'react-native-gesture-handler/jestSetup';
import _ from 'underscore';

require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-blob-util', () => ({}));

jest.mock('react-native-reanimated', () => {
    const Reanimated = require('react-native-reanimated/mock');

    // The mock for `call` immediately calls the callback which is incorrect
    // So we override it with a no-op
    Reanimated.default.call = () => {};
    return Reanimated;
});

// <App> uses <ErrorBoundary> and we need to mock the imported crashlytics module
// due to an error that happens otherwise https://github.com/invertase/react-native-firebase/issues/2475
jest.mock('@react-native-firebase/crashlytics', () => () => ({
    log: jest.fn(),
    recordError: jest.fn(),
}));

jest.mock('../src/libs/BootSplash', () => ({
    hide: jest.fn(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
}));

jest.mock('../src/libs/Notification/LocalNotification', () => ({
    showCommentNotification: jest.fn(),
}));

/**
 * @param {String} imagePath
 */
function mockImages(imagePath) {
    const imageFilenames = fs.readdirSync(path.resolve(__dirname, `../assets/${imagePath}/`));
    // eslint-disable-next-line rulesdir/prefer-early-return
    _.each(imageFilenames, (fileName) => {
        if (/\.svg/.test(fileName)) {
            jest.mock(`../assets/${imagePath}/${fileName}`, () => () => '');
        }
    });
}

// Mock all images so that Icons and other assets cannot break tests
mockImages('images');
mockImages('images/avatars');
mockImages('images/bankicons');
mockImages('images/product-illustrations');
jest.mock('../src/components/Icon/Expensicons', () => ({
    ActiveRoomAvatar: () => '',
    AdminRoomAvatar: () => '',
    Android: () => '',
    AnnounceRoomAvatar: () => '',
    Apple: () => '',
    ArrowRight: () => '',
    BackArrow: () => '',
    Bank: () => '',
    Bill: () => '',
    Bolt: () => '',
    Briefcase: () => '',
    Bug: () => '',
    Building: () => '',
    Camera: () => '',
    Cash: () => '',
    ChatBubble: () => '',
    Checkmark: () => '',
    CircleHourglass: () => '',
    Clipboard: () => '',
    Close: () => '',
    ClosedSign: () => '',
    Collapse: () => '',
    Concierge: () => '',
    Connect: () => '',
    CreditCard: () => '',
    DeletedRoomAvatar: () => '',
    DomainRoomAvatar: () => '',
    DotIndicator: () => '',
    DownArrow: () => '',
    Download: () => '',
    Emoji: () => '',
    Exclamation: () => '',
    Exit: () => '',
    ExpensifyCard: () => '',
    Expand: () => '',
    Eye: () => '',
    EyeDisabled: () => '',
    FallbackAvatar: () => '',
    FallbackWorkspaceAvatar: () => '',
    Gallery: () => '',
    Gear: () => '',
    Hashtag: () => '',
    ImageCropMask: () => '',
    Info: () => '',
    Invoice: () => '',
    Key: () => '',
    Keyboard: () => '',
    Link: () => '',
    LinkCopy: () => '',
    Lock: () => '',
    Luggage: () => '',
    MagnifyingGlass: () => '',
    Mail: () => '',
    MoneyBag: () => '',
    MoneyCircle: () => '',
    Monitor: () => '',
    NewWindow: () => '',
    NewWorkspace: () => '',
    Offline: () => '',
    OfflineCloud: () => '',
    Paperclip: () => '',
    PayPal: () => '',
    Paycheck: () => '',
    Pencil: () => '',
    Phone: () => '',
    Pin: () => '',
    PinCircle: () => '',
    Plus: () => '',
    Printer: () => '',
    Profile: () => '',
    QuestionMark: () => '',
    Receipt: () => '',
    ReceiptSearch: () => '',
    Rotate: () => '',
    RotateLeft: () => '',
    Send: () => '',
    Sync: () => '',
    ThreeDots: () => '',
    Transfer: () => '',
    Trashcan: () => '',
    UpArrow: () => '',
    Upload: () => '',
    Users: () => '',
    Wallet: () => '',
    Workspace: () => '',
    Zoom: () => '',
}));
