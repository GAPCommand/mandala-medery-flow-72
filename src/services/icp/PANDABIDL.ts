/**
 * 🔥👑✨ EXACT PANDAB IDL Factory
 * Saint Germain's Truth - Direct from Live Canister
 */

import { IDL } from '@dfinity/candid';
import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CommissionResult {
  'transaction_id': string;
  'consciousness_bonus': bigint;
  'base_commission': bigint;
  'sacred_fire_bonus': bigint;
  'total_commission': bigint;
  'blessing_applied': boolean;
}

export interface MarketplaceProfile {
  'id': string;
  'bio': string;
  'updated_at': bigint;
  'created_at': bigint;
  'user_id': string;
  'verification_status': string;
  'total_revenue': bigint;
  'total_reviews': bigint;
  'average_rating': number;
  'dealflo_score': bigint;
  'service_categories': Array<string>;
  'profile_image_url': [] | [string];
  'sacred_fire_blessed': boolean;
  'consciousness_level': bigint;
}

export interface MarketplaceStats {
  'total_services': bigint;
  'total_transactions': bigint;
  'active_widgets': bigint;
  'total_creators': bigint;
  'saint_germain_blessing': boolean;
  'sacred_fire_active': boolean;
  'consciousness_level': bigint;
}

export interface ServiceListing {
  'id': string;
  'title': string;
  'updated_at': bigint;
  'subcategory': [] | [string];
  'creator_id': string;
  'tags': Array<string>;
  'description': string;
  'base_price': bigint;
  'created_at': bigint;
  'sample_work_urls': Array<string>;
  'is_featured': boolean;
  'category': string;
  'included_revisions': bigint;
  'consciousness_requirement': bigint;
  'is_active': boolean;
  'pricing_model': string;
  'delivery_time_days': bigint;
  'sacred_fire_blessed': boolean;
}

export interface MarketplaceTransaction {
  'id': string;
  'status': string;
  'gapcommand_engines_used': Array<string>;
  'agreed_price': bigint;
  'creator_id': string;
  'sacred_fire_protected': boolean;
  'project_requirements': string;
  'created_at': bigint;
  'payment_method': string;
  'service_id': string;
  'client_satisfaction_rating': [] | [bigint];
  'processed_at': [] | [bigint];
  'delivery_notes': [] | [string];
  'client_id': string;
  'completed_at': [] | [bigint];
  'consciousness_level': bigint;
  'final_amount': bigint;
}

export interface MarketplaceWidget {
  'id': string;
  'deployment_domains': Array<string>;
  'consciousness_integration': bigint;
  'last_deployed_at': [] | [bigint];
  'performance_metrics': string;
  'created_at': bigint;
  'target_audience': string;
  'sacred_fire_styling': boolean;
  'configuration': string;
  'embed_code': string;
  'widget_type': string;
}

export interface TemplateData {
  'id': string;
  'template_category': string;
  'asset_urls': Array<string>;
  'creator_id': string;
  'template_name': string;
  'consciousness_requirement': bigint;
  'deployment_instructions': string;
  'sacred_fire_enhanced': boolean;
}

export type Result = { 'ok': string } | { 'err': string };
export type Result_1 = { 'ok': CommissionResult } | { 'err': string };

export interface _SERVICE {
  'calculateCommissions': ActorMethod<[string], Result_1>;
  'createBooking': ActorMethod<[MarketplaceTransaction], Result>;
  'createCreatorProfile': ActorMethod<[MarketplaceProfile], Result>;
  'createMarketplaceWidget': ActorMethod<[MarketplaceWidget], Result>;
  'createServiceOffering': ActorMethod<[ServiceListing], Result>;
  'deployTemplate': ActorMethod<[TemplateData], Result>;
  'deployWidget': ActorMethod<[string, string], Result>;
  'getCreatorProfile': ActorMethod<[string], [] | [MarketplaceProfile]>;
  'getMarketplaceStats': ActorMethod<[], MarketplaceStats>;
  'getServicesByCategory': ActorMethod<[string], Array<ServiceListing>>;
  'initiateTransaction': ActorMethod<[string, string, bigint], Result>;
  'processPayment': ActorMethod<[string, string], Result>;
  'searchServices': ActorMethod<[[] | [string], [] | [bigint]], Array<ServiceListing>>;
  'updateCreatorStats': ActorMethod<[string, bigint, bigint, number], Result>;
}

export const idlFactory = ({ IDL }: any) => {
  const CommissionResult = IDL.Record({
    'transaction_id': IDL.Text,
    'consciousness_bonus': IDL.Nat,
    'base_commission': IDL.Nat,
    'sacred_fire_bonus': IDL.Nat,
    'total_commission': IDL.Nat,
    'blessing_applied': IDL.Bool,
  });
  
  const Result_1 = IDL.Variant({ 'ok': CommissionResult, 'err': IDL.Text });
  const Result = IDL.Variant({ 'ok': IDL.Text, 'err': IDL.Text });
  
  const MarketplaceProfile = IDL.Record({
    'id': IDL.Text,
    'bio': IDL.Text,
    'updated_at': IDL.Int,
    'created_at': IDL.Int,
    'user_id': IDL.Text,
    'verification_status': IDL.Text,
    'total_revenue': IDL.Nat,
    'total_reviews': IDL.Nat,
    'average_rating': IDL.Float64,
    'dealflo_score': IDL.Nat,
    'service_categories': IDL.Vec(IDL.Text),
    'profile_image_url': IDL.Opt(IDL.Text),
    'sacred_fire_blessed': IDL.Bool,
    'consciousness_level': IDL.Nat,
  });
  
  const ServiceListing = IDL.Record({
    'id': IDL.Text,
    'title': IDL.Text,
    'updated_at': IDL.Int,
    'subcategory': IDL.Opt(IDL.Text),
    'creator_id': IDL.Text,
    'tags': IDL.Vec(IDL.Text),
    'description': IDL.Text,
    'base_price': IDL.Nat,
    'created_at': IDL.Int,
    'sample_work_urls': IDL.Vec(IDL.Text),
    'is_featured': IDL.Bool,
    'category': IDL.Text,
    'included_revisions': IDL.Nat,
    'consciousness_requirement': IDL.Nat,
    'is_active': IDL.Bool,
    'pricing_model': IDL.Text,
    'delivery_time_days': IDL.Nat,
    'sacred_fire_blessed': IDL.Bool,
  });
  
  const MarketplaceTransaction = IDL.Record({
    'id': IDL.Text,
    'status': IDL.Text,
    'gapcommand_engines_used': IDL.Vec(IDL.Text),
    'agreed_price': IDL.Nat,
    'creator_id': IDL.Text,
    'sacred_fire_protected': IDL.Bool,
    'project_requirements': IDL.Text,
    'created_at': IDL.Int,
    'payment_method': IDL.Text,
    'service_id': IDL.Text,
    'client_satisfaction_rating': IDL.Opt(IDL.Nat),
    'processed_at': IDL.Opt(IDL.Int),
    'delivery_notes': IDL.Opt(IDL.Text),
    'client_id': IDL.Text,
    'completed_at': IDL.Opt(IDL.Int),
    'consciousness_level': IDL.Nat,
    'final_amount': IDL.Nat,
  });
  
  const MarketplaceWidget = IDL.Record({
    'id': IDL.Text,
    'deployment_domains': IDL.Vec(IDL.Text),
    'consciousness_integration': IDL.Nat,
    'last_deployed_at': IDL.Opt(IDL.Int),
    'performance_metrics': IDL.Text,
    'created_at': IDL.Int,
    'target_audience': IDL.Text,
    'sacred_fire_styling': IDL.Bool,
    'configuration': IDL.Text,
    'embed_code': IDL.Text,
    'widget_type': IDL.Text,
  });
  
  const TemplateData = IDL.Record({
    'id': IDL.Text,
    'template_category': IDL.Text,
    'asset_urls': IDL.Vec(IDL.Text),
    'creator_id': IDL.Text,
    'template_name': IDL.Text,
    'consciousness_requirement': IDL.Nat,
    'deployment_instructions': IDL.Text,
    'sacred_fire_enhanced': IDL.Bool,
  });
  
  const MarketplaceStats = IDL.Record({
    'total_services': IDL.Nat,
    'total_transactions': IDL.Nat,
    'active_widgets': IDL.Nat,
    'total_creators': IDL.Nat,
    'saint_germain_blessing': IDL.Bool,
    'sacred_fire_active': IDL.Bool,
    'consciousness_level': IDL.Nat,
  });
  
  return IDL.Service({
    'calculateCommissions': IDL.Func([IDL.Text], [Result_1], []),
    'createBooking': IDL.Func([MarketplaceTransaction], [Result], []),
    'createCreatorProfile': IDL.Func([MarketplaceProfile], [Result], []),
    'createMarketplaceWidget': IDL.Func([MarketplaceWidget], [Result], []),
    'createServiceOffering': IDL.Func([ServiceListing], [Result], []),
    'deployTemplate': IDL.Func([TemplateData], [Result], []),
    'deployWidget': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'getCreatorProfile': IDL.Func([IDL.Text], [IDL.Opt(MarketplaceProfile)], ['query']),
    'getMarketplaceStats': IDL.Func([], [MarketplaceStats], ['query']),
    'getServicesByCategory': IDL.Func([IDL.Text], [IDL.Vec(ServiceListing)], ['query']),
    'initiateTransaction': IDL.Func([IDL.Text, IDL.Text, IDL.Nat], [Result], []),
    'processPayment': IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'searchServices': IDL.Func([IDL.Opt(IDL.Text), IDL.Opt(IDL.Nat)], [IDL.Vec(ServiceListing)], ['query']),
    'updateCreatorStats': IDL.Func([IDL.Text, IDL.Nat, IDL.Nat, IDL.Float64], [Result], []),
  });
};

export const init = ({ IDL }: any) => { return []; };