import { UrlSafeEncoderService } from './services/url-safe-encoder.service.js';
import { GiftPairsViewComponent } from './components/gift-pairs-view/gift-pairs-view.component.js';

const urlSafeEncoder = new UrlSafeEncoderService();

new GiftPairsViewComponent({ urlSafeEncoder });
