
import React from 'react';
import { Card } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import ContactForm from './contact/ContactForm';
import DistributorBenefits from './contact/DistributorBenefits';
import ContactInfo from './contact/ContactInfo';
import ResponsePromise from './contact/ResponsePromise';
import { TemplateBrandName } from '@/components/template/TemplateBrandName';
import { TemplateTagline } from '@/components/template/TemplateTagline';

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-700 mb-6">
              🍯 Join Our Sacred Distribution Network
            </h2>
            <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
              Partner with <TemplateBrandName fallback="Mandala Medery" /> to bring consciousness-driven, premium <TemplateTagline fallback="Kashmir mead" /> to your territory. 
              Experience exclusive distributor benefits and territorial protection.
            </p>
            <div className="flex justify-center items-center space-x-2 text-amber-600">
              <Crown className="h-5 w-5" />
              <span className="font-semibold">Exclusive Territorial Rights Available</span>
              <Crown className="h-5 w-5" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="p-8 bg-white shadow-xl border-amber-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-amber-700 mb-2">
                  Start Your Distribution Journey
                </h3>
                <p className="text-gray-600">
                  Fill out the form below and our distribution team will contact you within 24 hours 
                  to discuss exclusive opportunities in your area.
                </p>
              </div>
              <ContactForm />
            </Card>

            {/* Benefits & Contact Info */}
            <div className="space-y-8">
              <DistributorBenefits />
              <ContactInfo />
              <ResponsePromise />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
