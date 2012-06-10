<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Base_Delegate {
	
	public $EE, $suffix = '_delegate';
	
	public function __construct()
	{
		$this->EE =& get_instance();
	}

	/**
		* Magic method that handles the delegate routing
		*
		* @access	public
		* @param	string 	Name of the delegate.
		* @param	array	This parameter is required by PHP, but is not used.
		* @return	object;
	*/

	public function __call($name, $arguments = array())
	{		
		if(!method_exists($this, $name))
		{
			$delegate = $this->load($name);
			$method   = $this->EE->TMPL->tagparts[2];
			$params   = $this->EE->TMPL->tagparams;
			
			return $delegate->$method($params);
		}
		else
		{
			return call_user_func_array(array($this, $name), $arguments);
		}		
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Load the specified delegate
		*
		* @access	protected
		* @param	string The name of the delegate
		* @return	object
	*/
	
	protected function load($name)
	{
		require_once ucfirst($name).'.php';

		$class = $name.$this->suffix;

		return new $class;
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Validate the delegate method as valid before it's called.
		*
		* @access	public
		* @param	string	A name of a PHP class
		* @param 	string  A name of a method with the defined class.
		* @return	mixed
	*/

	public function validate($class, $method)
	{
		if(!method_exists($class, $method))
		{
			$this->show_error('The '.$method.' does not exist in the '.$class.' class.');
		}
		
		return TRUE;
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Get the available delegates
		*
		* @access	protected
		* @param	string	If a name is passed, the method will return a single delegate (object).
		*					Otherwise, an array is returned.
		* @return	mixed
	*/
	
	protected function get_delegates($name = FALSE, $directory = '../delegates')
	{
		$delegates = array();
		
		foreach(directory_map($directory) as $file)
		{
			if(file_exists($directory.'/'.$file) && $file != 'Base_Delegate.php')
			{
				$delegates[] = $this->load(str_replace('.php', '', $file));
			}
		}
		
		if(!$name)
		{
			return $delegates;
		}
		else
		{
			return $delegates[$name];
		}
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Get a single delegate object
		*
		* @access	protected
		* @param	string The name of the delegate
		* @return	object
	*/
	
	protected function get_delegate($name)
	{
		return $this->get_delegates($name);
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Return a JSON response
		*
		* @access	Public
		* @param	mixed 
		* @return	JSON
	*/
	
	public function json($data)
	{
		header('Content-header: application/json');

		exit(json_encode($data));
	}
	
	// ------------------------------------------------------------------

	/**
		* Show a user error
		*
		* @access	public
		* @param	string	The error string
		* @return	error
	*/
	
	public function show_error($error)
	{
		$this->EE->output->show_user_error('general', $error);
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Parse variables in an EE template
		*
		* @access	protected
		* @param	array 	An array of variables to be parsed
		* @param	mixed 	You may pass your own tagdata if desired
		* @return	string
	*/
	
	protected function parse($vars, $tagdata = FALSE)
	{
		if($tagdata === FALSE)
		{
			$tagdata = $this->EE->TMPL->tagdata;
		}
			
		return $this->EE->TMPL->parse_variables($tagdata, $vars);
	}
	
	// ------------------------------------------------------------------
	
	/**
		* Easily fetch parameters from an EE template
		*
		* @access	protected
		* @param	string		The name of the parameter
		* @param 	mixed		The default parameter value
		* @param 	bool		Should the param return a boolean value?
		* @param 	bool		Is the parameter required?
		* @return	mixed
	*/
	
	protected function param($param, $default = FALSE, $boolean = FALSE, $required = FALSE)
	{
		$name 	= $param;
		$param 	= $this->EE->TMPL->fetch_param($param);
		
		if($required && !$param) show_error('You must define a "'.$name.'" parameter.');
			
		if($param === FALSE && $default !== FALSE)
		{
			$param = $default;
		}
		else
		{				
			if($boolean)
			{
				$param = strtolower($param);
				$param = ($param == 'true' || $param == 'yes') ? TRUE : FALSE;
			}			
		}
		
		return $param;			
	}
	
	// ------------------------------------------------------------------	
}

/* End of file Base_Delegate.php */