/*
 * Oscar Jaimes, Modifying this file on November 25, 2019.
 *
 * This program provides a simple simulation of a gas pump for an Android Phone.  This is
 * the starting java file.
 *
 * Created for an assignment in AUCSC 220.
 * by R. Heise
 * October/November 2019
 *
 * Usage:
 *   1) Open the app.
 *   2) Click on a type of gas.
 *   3) Move the seek bar to fill up the tank.
 *      - Number of litres and price display at the bottom.
 *   Notes:
 *   - You may move the seek bar backwards and you may change the
 *     type of gas as you fill.  Program assumes tank has
 *     only one kind of gas (not a mixture).
 *   - If you forget to select a type of gas, you will be
 *     prompted with a Toast
 *
 */
package com.example.gaspump;

import androidx.appcompat.app.AppCompatActivity;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    //Data - items needed to be shared in methods that don't allow parameters to be passed
    //       due to the strict format of the methods (e.g. onClicks)
    private boolean gasTypeSelected = false; //Becomes true once a gas type is selected
    private double costPerLitre = 0.0; //Nothing selected, so price unknown
    private double progressOfFill = 0.0; //Used to track progress (esp when gas type not yet
                                         //selected); In litres

    /**
     * When program starts.
     * 1) Set up the seek bar for filling the gas tank
     * 2) Fill in the initial number of litres (0) and price (0)
     *
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button reg = findViewById(R.id.regularButton);
        Button mid = findViewById(R.id.midGradeButton);
        Button prem = findViewById(R.id.premiumButton);

        reg.setBackgroundColor(Color.RED);
        mid.setBackgroundColor(Color.RED);
        prem.setBackgroundColor(Color.RED);

        //Set up the seek bar that handles filling the gas tank
        SeekBar fillTankSB = (SeekBar) findViewById(R.id.tankFillingSeekBar);
        fillTankSB.setOnSeekBarChangeListener(
                new SeekBar.OnSeekBarChangeListener() {
                    /**
                     * Displays litres (and price - if gas type is known) on screen.
                     * @param seekBar the gas filling up bar
                     * @param progress how far along (out of 1000)
                     * @param fromUser true, as user is the only control expected
                     * Sideeffect: Changes instance variable
                     */
                    @Override
                    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser){
                        progressOfFill = progress / 10.0; //Progress in litres

                        TextView numLitresTV = (TextView) findViewById(R.id.numLitresTV);
                        TextView actCostTV = (TextView) findViewById(R.id.actCostTV);

                        if (gasTypeSelected) {
                            numLitresTV.setText(String.format("%6.1f", progressOfFill));//display liters
                            actCostTV.setText(String.format("%6.2f",
                                    (progressOfFill * costPerLitre / 100))); //display price
                        }
                        else {//only display litres
                            numLitresTV.setText(String.format("%6.1f", progressOfFill));
                        }
                    } //onProgressChanged

                    /**
                     * Displays toast if the gas type has not been selected.
                     * @param seekBar the gas filling up bar
                     */
                    @Override
                    public void onStartTrackingTouch(SeekBar seekBar) {
                        if (!gasTypeSelected){
                            Toast.makeText(MainActivity.this, "Pick a type of gas",
                                   Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onStopTrackingTouch(SeekBar seekBar) {
                        //empty on purpose
                    }
                } //new
        ); //setOnSeekBarChangeListener

        //Fill in the initial number of litres and price (both zero)
        TextView numLitresTV = (TextView) findViewById(R.id.numLitresTV);
        TextView actCostTV = (TextView) findViewById(R.id.actCostTV);
        numLitresTV.setText(String.format("%6.1f", 0.0));
        actCostTV.setText(String.format("%6.2f", 0.0));
    } //onCreate

    /**
     * Sets up the instance data for regular gas; highlights button; updates litres and price.
     * @param regButtonV - the button the customer pressed
     * Side-effects: changes instance variables, and screen info
     */
    public void regGas(View regButtonV){
        //TODO The three gas types interact (future: consider radio button)
        //Find the 3 buttons
        Button regButton = (Button) regButtonV;
        Button midGradeButton = (Button) findViewById(R.id.midGradeButton);
        Button premiumButton = (Button) findViewById(R.id.premiumButton);

        //Only highlight selected button
        regButton.setBackgroundColor(Color.GRAY);
        midGradeButton.setBackgroundColor(Color.RED);
        premiumButton.setBackgroundColor(Color.RED);

        //Change instance variables
        costPerLitre = Double.parseDouble(getResources().getString(R.string.regular_price));
        gasTypeSelected = true;

        //update litres and price shown on screen
        TextView numLitresTV = (TextView) findViewById(R.id.numLitresTV);
        TextView actCostTV = (TextView) findViewById(R.id.actCostTV);
        numLitresTV.setText(String.format("%6.1f", progressOfFill));
        actCostTV.setText(String.format("%6.2f",
                (progressOfFill * costPerLitre / 100.0)));
    }//regGas

    /**
     * Sets up the instance data for mid-grade gas; highlights button; updates litres and price.
     * @param midGradeButtonV - the button the customer pressed
     * Side-effects: changes instance variables and screen info
     */
    public void midGradeGas(View midGradeButtonV){
        Button midGradeButton = (Button) midGradeButtonV;
        Button regButton = (Button) findViewById(R.id.regularButton);
        Button premiumButton = (Button) findViewById(R.id.premiumButton);

        //Only highlight selected button
        midGradeButton.setBackgroundColor(Color.GRAY);
        regButton.setBackgroundColor(Color.RED);
        premiumButton.setBackgroundColor(Color.RED);

        //Change instance variables
        costPerLitre = Double.parseDouble(getResources().getString(R.string.mid_grad_price));
        gasTypeSelected = true;

        //update litres and price shown on screen
        TextView numLitresTV = (TextView) findViewById(R.id.numLitresTV);
        TextView actCostTV = (TextView) findViewById(R.id.actCostTV);
        numLitresTV.setText(String.format("%6.1f", progressOfFill));
        actCostTV.setText(String.format("%6.2f",
                (progressOfFill * costPerLitre / 100.0)));
     }//midGradeGas

    /**
     * Sets up the instance data for premium gas; highlights button; updates litres and price.
     * @param premiumButtonV - the button the customer pressed
     * Side-effects: changes instance variables and screen info
     */
    public void premiumGas(View premiumButtonV){
        Button premiumButton = (Button) premiumButtonV;
        Button regButton = (Button) findViewById(R.id.regularButton);
        Button midGradeButton = (Button) findViewById(R.id.midGradeButton);

        //Only highlight selected button
        premiumButton.setBackgroundColor(Color.GRAY);
        regButton.setBackgroundColor(Color.RED);
        midGradeButton.setBackgroundColor(Color.RED);

        //Change instance variables
        costPerLitre = Double.parseDouble(getResources().getString(R.string.premium_price));
        gasTypeSelected = true;

        //update litres and price shown on screen
        TextView numLitresTV = (TextView) findViewById(R.id.numLitresTV);
        TextView actCostTV = (TextView) findViewById(R.id.actCostTV);
        numLitresTV.setText(String.format("%6.1f", progressOfFill));
        actCostTV.setText(String.format("%6.2f",
                (progressOfFill * costPerLitre / 100.0)));
    }//premiumGas
}//end of class
