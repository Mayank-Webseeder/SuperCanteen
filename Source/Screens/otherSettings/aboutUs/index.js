import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Height } from '../../../constants';
import CustomCommonHeader from '@components/Common/CustomCommonHeader';
import { styles } from './styles';

const AboutUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomCommonHeader
        navigation={navigation}
        title="About Us"
        containerStyle={styles.header}
      />
      
      <ScrollView contentContainerStyle={styles.content}>      
        {/* Introduction Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who We Are</Text>
          <Text style={styles.sectionText}>
            We're a passionate team dedicated to bringing you the best shopping experience. 
            Founded in 2023, we've grown from a small startup to one of the most trusted 
            e-commerce platforms, serving millions of happy customers.
          </Text>
        </View>
        
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10M+</Text>
              <Text style={styles.statLabel}>Happy Customers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500K+</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150+</Text>
              <Text style={styles.statLabel}>Brands</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </View>
        
        {/* Values Section */}
        <View style={[styles.section,{marginTop:Height(4)}]}>
          <Text style={styles.sectionTitle}>Our Values</Text>
          
          <View style={styles.valuesGrid}>
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#FFE8E8'}]}>
                <Icon name="favorite" size={24} color="#FF6B6B" />
              </View>
              <Text style={styles.valueTitle}>Customer First</Text>
              <Text style={styles.valueText}>
                Your satisfaction is our top priority in every decision we make.
              </Text>
            </View>
            
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#E8F5E9'}]}>
                <Icon name="eco" size={24} color="#4CAF50" />
              </View>
              <Text style={styles.valueTitle}>Sustainability</Text>
              <Text style={styles.valueText}>
                Committed to eco-friendly practices and reducing our carbon footprint.
              </Text>
            </View>
            
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#E3F2FD'}]}>
                <Icon name="rocket-launch" size={24} color="#2196F3" />
              </View>
              <Text style={styles.valueTitle}>Innovation</Text>
              <Text style={styles.valueText}>
                Constantly evolving to bring you the best shopping technology.
              </Text>
            </View>
            
            <View style={styles.valueCard}>
              <View style={[styles.valueIcon, {backgroundColor: '#FFF8E1'}]}>
                <Icon name="star" size={24} color="#FFC107" />
              </View>
              <Text style={styles.valueTitle}>Quality</Text>
              <Text style={styles.valueText}>
                Curating only the best products from trusted brands.
              </Text>
            </View>
          </View>
        </View>
        
        {/* Team Section */}
        <View style={[styles.section,{marginTop:Height(11)}]}>
          <Text style={styles.sectionTitle}>Meet The Team</Text>
          <Text style={styles.sectionText}>
            Behind every great shopping experience is an amazing team. 
            We're a diverse group of designers, developers, and customer 
            service experts united by our passion for e-commerce.
          </Text>
          
          <View style={styles.teamGrid}>
            <View style={styles.teamMember}>
              <View style={styles.teamIcon}>
                <Icon name="person" size={30} color={COLORS.primary} />
              </View>
              <Text style={styles.teamName}>Alex Johnson</Text>
              <Text style={styles.teamRole}>Founder & CEO</Text>
            </View>
            
            <View style={styles.teamMember}>
              <View style={styles.teamIcon}>
                <Icon name="person" size={30} color={COLORS.primary} />
              </View>
              <Text style={styles.teamName}>Sarah Williams</Text>
              <Text style={styles.teamRole}>Head of Design</Text>
            </View>
          </View>
        </View>
        
        {/* CTA Section */}
        <View style={styles.ctaContainer}>
          <Icon name="shopping-cart" size={40} color={COLORS.white} style={styles.ctaIcon} />
          <Text style={styles.ctaTitle}>Join Our Growing Community</Text>
          <Text style={styles.ctaText}>
            Start shopping today for the best experience with exclusive deals.
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutUsScreen;