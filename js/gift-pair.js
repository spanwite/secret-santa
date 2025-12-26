import { UrlSafeEncodingService } from './services/url-safe-encoding.service.js';
import { GiftPairViewComponent } from './components/gift-pair-view.component.js';

const urlSafeEncodingService = new UrlSafeEncodingService();

new GiftPairViewComponent({ urlSafeEncodingService });
